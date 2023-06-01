const express = require('express');
//example also requires 'cookie-parser'
const app = express();

app.use(express.json());
app.use(express.static('public'));

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
    let conversations = [];
    users.forEach((user) => {
        if(user.username !== req.params.username){
            conversations.push(user.username);
        }
    });

    res.send({
        "success":true,
        "conversations":conversations
    });//success will only not be true if there is an error accessing the database
});

app.get('/messages/:username',(req,res) => {
    let personalMessages = [];
    messages.forEach((message) => {
        if(message.recipient === req.params.username || message.sender === req.params.username){
            personalMessages.push(message);
        }
    });

    res.send({
        "success":true,
        "messages":personalMessages
    });
});

app.put('/messages',(req,res) => {
    messages.push(req.body);
    console.log(req.body);
    res.send({"success":true});
});

app.put('/user',(req,res) => {
    let updatedUser = req.body;
    console.log(req.body);

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

const port = 4000;
app.listen(port,function (){ 
    console.log(`Listening on port ${port}`);
    console.log(messages);
});