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

let users = [
    {
        username:"Andrew",
        password:"Cambridge",
        authtoken:"Andrew_token"
    },
    {
        username:"Jimmy",
        password:"Jimmy",
        authtoken:"Jimmy_token"
    },
    {
        username:"Joseph",
        password:"Joseph",
        authtoken:"Joseph_token"
    },
    {
        username:"David",
        password:"David",
        authtoken:"David_token"
    },
    {
        username:"Catherine",
        password:"Catherine",
        authtoken:"Catherine_token"
    },
    {
        username:"Stephanie",
        password:"Stephanie",
        authtoken:"Stephanie_token"
    },
    {
        username:"Emma",
        password:"Emma",
        authtoken:"Emma_token"
    },
    {
        username:"Erin",
        password:"Erin",
        authtoken:"Erin_token"
    }
];
let messages = [
    {
        text:"hi there, how are you?",
        sender:"Jimmy",
        recipient:"Andrew"
    },
    {
        text:"I am doing well, how about yourself?",
        sender:"Andrew",
        recipient:"Jimmy"
    },
    {
        text:"what's up?",
        sender:"Joseph",
        recipient:"Andrew"
    },
    {
        text:"hey Emma, how are you doing?",
        sender:"Andrew",
        recipient:"Emma"
    },
    {
        text:"I'm good",
        sender:"Emma",
        recipient:"Andrew"
    },
    {
        text:"hey Stephanie, how are you doing?",
        sender:"Andrew",
        recipient:"Stephanie"
    },
    {
        text:"cool",
        sender:"Stephanie",
        recipient:"Andrew"
    },
    {
        text:"I won the lottery!",
        sender:"Andrew",
        recipient:"Erin"
    },
    {
        text:"nice!",
        sender:"Erin",
        recipient:"Andrew"
    }
];

app.get('/authorize/:authtoken',(req,res) => {
    let nextLink;
    let success = false;
    let username;

    users.forEach((user) => {
        if(user.authtoken === req.params.authtoken){
            success = true;
            username = user.username;
        }
    });

    if(success){
        nextLink = MESSAGE_HOME;
    }
    else{
        nextLink = INDEX_HTML;
    }

    res.send({'success':success,'nextLink':nextLink,'username':username});
});

app.get('/login/:username/:password',(req,res) => {
    let success = false;
    let authtoken;
    users.forEach((user) => {
        if(req.params.username === user.username){
            if(req.params.password === user.password){
                success = true;
                authtoken = user.authtoken;
            }
        }
    });

    let nextLink;
    if(success){
        nextLink = MESSAGE_HOME;
    }

    res.send({
        'success':success,
        'nextLink':nextLink,
        'authtoken':authtoken,
        'username':req.params.username})
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

    let oldUser;
    let unique = true;
    let found = false;
    let message;
    users.forEach((user) => {
        if(user.username === updatedUser.oldUsername){
            oldUser = user;
            found = true;
        }
        else{
            if(user.username === updatedUser.newUsername){
                unique = false;
                message = "non-unique username submitted";
            }
            else if(user.password === updatedUser.newPassword){
                unique = false;
                message = "non-unique password submitted";
            }
        }
    });

    let success = false;
    if(found && unique){
        oldUser.username = updatedUser.newUsername;
        oldUser.password = updatedUser.newPassword;
        oldUser.authtoken = updatedUser.newUsername + "_token";
        success = true;
    }

    res.send({
        "success":success,
        "username":oldUser?.username,
        "authtoken":oldUser?.authtoken,
        "message":message,
        "nextLink":MESSAGE_HOME
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
        if(addConfirm.success){
            users.push(createdUser);
        }
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