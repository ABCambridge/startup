const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const database = require('./database.js');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const INDEX_HTML = "index.html";
const MESSAGE_HOME = "messageHome.html";

app.get('/authorize/:authtoken',(req,res) => {
    let nextLink;
    let success = false;
    let username;

    let result = database.findByAuthtoken(req.params.authtoken);

    result.then((data) => {
        if(data !== null){
            success = true;
            username = data.username;
            nextLink = MESSAGE_HOME;
        }
        else{
            nextLink = INDEX_HTML;
        }

        res.send({
            'success':success,
            'nextLink':nextLink,
            'username':username
        });
    });

});

app.get('/login/:username/:password',(req,res) => {
    let success = false;
    let authtoken;
    let nextLink;

    let result = database.validateCredentials(req.params.username);

    result.then((data) => {
        if(data !== null ){
            if(data.password === req.params.password){
                success = true;
                authtoken = data.authtoken;
                nextLink = MESSAGE_HOME;
            }
        }
        res.send({
            'success':success,
            'nextLink':nextLink,
            'authtoken':authtoken,
            'username':req.params.username
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

    let result = database.updateUser(updatedUser);

    result.then((response) => {
        if(response.success){
            response.nextLink = MESSAGE_HOME;
            res.send(response);
        }
        else{
            res.send(response);
        }
    });
});

app.post('/user',(req,res) => {
    let createdUser = {
        "username": req.body.newUsername,
        "password": req.body.newPassword,
        "authtoken": req.body.newUsername + "_token"
    }
    const result = database.addUser(createdUser);

    result.then((addConfirm) => {
        res.send({
            "success":addConfirm.success,
            "username":createdUser.username,
            "authtoken":createdUser.authtoken,
            "message":addConfirm.message,
            "nextLink":MESSAGE_HOME
        });
    });    
});

const port = 4000;
app.listen(port,function (){ 
    console.log(`Listening on port ${port}`);
});