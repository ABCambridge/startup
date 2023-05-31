const express = require('express');
//example also requires 'cookie-parser'
const app = express();

app.use(express.json());
app.use(express.static('public'));


const TEST_AUTH_TOKEN = "test_auth_token_1001";
const TEST_USERNAME = "Andrew";
const TEST_PASSWORD = "Cambridge";
const INDEX_HTML = "index.html";
const MESSAGE_HOME = "messageHome.html";

let conversations = ["Jimmy","Joseph","Dave","Catherine","Stephanie","Emma","Erin"];
let messages = [
    {
        text:"hi there, how are you?",
        type:"incomingMessage",
        user:"Jimmy"
    },
    {
        text:"I am doing well, how about yourself?",
        type:"outgoingMessage",
        user:"Jimmy"
    },
    {
        text:"what's up?",
        type:"incomingMessage",
        user:"Joseph"
    },
    {
        text:"hey Emma, how are you doing?",
        type:"outgoingMessage",
        user:"Emma"
    },
    {
        text:"I'm good",
        type:"incomingMessage",
        user:"Emma"
    },
    {
        text:"hey Stephanie, how are you doing?",
        type:"outgoingMessage",
        user:"Stephanie"
    },
    {
        text:"cool",
        type:"incomingMessage",
        user:"Stephanie"
    },
    {
        text:"I won the lottery!",
        type:"outgoingMessage",
        user:"Erin"
    },
    {
        text:"nice!",
        type:"incomingMessage",
        user:"Erin"
    }
];

app.get('/authorize/:authtoken',(req,res) => {
    let nextLink;
    let success;
    let username;
    if(req.params.authtoken === TEST_AUTH_TOKEN){//TODO: this is where you check with the database about the authtoken (separate function)
        nextLink = MESSAGE_HOME;
        success = true;
        username = TEST_USERNAME;//This should become the username in the database
    }
    else{
        nextLink = INDEX_HTML;
        success = false;
    }

    res.send({'success':success,'nextLink':nextLink,'username':username});
});

app.get('/login/:username/:password',(req,res) => {
    let success = true;
    if(req.params.username !== TEST_USERNAME){
        success = false;
    }
    if(req.params.password !== TEST_PASSWORD){
        success = false;
    }

    let nextLink;
    let authtoken;
    if(success){
        nextLink = MESSAGE_HOME;
        authtoken = TEST_AUTH_TOKEN;
    }

    res.send({
        'success':success,
        'nextLink':nextLink,
        'authtoken':authtoken,
        'username':req.params.username})
});

app.get('/conversations',(req,res) => {
    res.send({
        "success":true,
        "conversations":conversations
    });//success will only not be true if there is an error accessing the database
});

app.get('/messages',(req,res) => {
    res.send({
        "success":true,
        "messages":messages
    });
});

const port = 4000;
app.listen(port,function (){ 
    console.log(`Listening on port ${port}`);
});