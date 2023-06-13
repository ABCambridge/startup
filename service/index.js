const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const crypt = require('bcrypt');
const database = require('./database.js');
const { chatProxy } = require('./chatProxy.js');

const app = express();

app.use(express.json());
app.use(express.static('./'));
app.use(cookieParser());
app.set('trust proxy', true);

const INDEX_HTML = "index.html";
const MESSAGE_HOME = "messageHome.html";
const TOKEN_NAME = "FastChat_token";

app.get('/authorize',(req,res) => {
    let nextLink;
    let success = false;
    let username;

    let result = database.findByAuthtoken(req.cookies[TOKEN_NAME]);

    result.then((data) => {
        if(data !== null){
            if(data.loggedIn){
                success = true;
                username = data.username;
                nextLink = MESSAGE_HOME;
            }
        }
        if(!success){
            res.status(401);
            nextLink = INDEX_HTML;
        }

        res.send({
            'success':success,
            'nextLink':nextLink,
            'username':username
        });
    });

});

app.get('/login/:username/:password',async function (req,res) {
    let success = false;
    let authtoken;
    let nextLink;

    let result = database.validateCredentials(req.params.username);

    result.then(async function (data) {
        if(data !== null ){
            let comp = await crypt.compare(req.params.password,data.password);
            if(comp){
                success = true;
                authtoken = data.authtoken;
                nextLink = MESSAGE_HOME;
                setCookieToken(res,data.authtoken);
                database.changeLoginStatus(authtoken,true);
            }
            if(!success){
                res.status(401);
            }
            res.send({
                'success':success,
                'nextLink':nextLink,
                'username':req.params.username
            }); 
        }
        else{
            res.status(401).send({
                "success":false,
                "message":"Requested user does not exist"
            });
        }
    });
});

app.put('/logout',(req,res) => {
    let nextLink;
    let success = false;
    let authtoken = req.cookies[TOKEN_NAME]; 
    let result = database.findByAuthtoken(authtoken);

    result.then((data) => {
        if(data !== null){
            database.changeLoginStatus(authtoken,false);
            success = true;
            nextLink = INDEX_HTML;
        }
        res.clearCookie(TOKEN_NAME);
        res.send({
            "success":success,
            "nextLink":nextLink
        });
    });
});

app.get('/conversations/:username',(req,res) => {
    let listResult = database.getUserList();
    let conversations = [];

    listResult.then((userList) => {
        userList.forEach((user) => {
                if(user.username !== req.params.username){
                    conversations.push(user.username);
                }
            });

        res.send({
            "success":true,
            "conversations":conversations
        });
    });
});

app.get('/messages/:username',(req,res) => {
    let result = database.getMessages(req.params.username);

    result.then((messageList) => {
        res.send({
            "success":true,
            "messages":messageList
        });
    });
});

app.put('/messages',(req,res) => {
    database.putMessage(req.body);
    res.send({"success":true});
});

app.put('/user',(req,res) => {
    let updatedUser = req.body;

    database.validateCredentials(updatedUser.oldUsername)
        .then((isLoggedIn) => {
            if(isLoggedIn){
                let result = database.updateUser(updatedUser);

                result.then((response) => {
                    if(response.success){
                        response.nextLink = MESSAGE_HOME;
                        setCookieToken(res,req.cookies[TOKEN_NAME]);
                        res.send(response);
                    }
                    else{
                        res.send(response);
                    }
                });
            }
            else{
                res.status(401).send({
                    "success":false,
                    "message": "Authentication session failed"
                })
            }
        });

    
});

app.post('/user',(req,res) => {
    let getHash = crypt.hash(req.body.newPassword,10);
    getHash.then((hash) => {
        let createdUser = {
            "username": req.body.newUsername,
            "password": hash,
            "authtoken": uuid.v4()
        }

        const result = database.addUser(createdUser);
        result.then((addConfirm) => {
            database.changeLoginStatus(createdUser.authtoken,true);
            setCookieToken(res,createdUser.authtoken);
            res.send({
                "success":addConfirm.success,
                "username":createdUser.username,
                "message":addConfirm.message,
                "nextLink":MESSAGE_HOME
            });
        });    
    });
});

function setCookieToken(res,token){
    res.cookie(TOKEN_NAME,token,{
        secure:true,
        httpOnly: true,
        sameSite: 'strict'
    });
}

const port = 4000;
const server = app.listen(port,function (){ 
    console.log(`Listening on port ${port}`);
});

chatProxy(server);