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

app.get('/authorize/:authtoken',(req,res) => {
    let nextLink;
    let success;
    let username;
    if(req.params.authtoken === TEST_AUTH_TOKEN){//TODO: this is where you check with the database about the authtoken
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

const port = 4000;
app.listen(port,function (){ 
    console.log(`Listening on port ${port}`);
});