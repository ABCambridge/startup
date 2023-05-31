const express = require('express');
//example also requires 'cookie-parser'
const app = express();

app.use(express.json());
app.use(express.static('public'));


const TEST_AUTH_TOKEN = "test_auth_token_1001";
const TEST_USERNAME = "Andrew";
const TEST_PASSWORD = "Cambridge";
app.get('/login/:authtoken',(req,res) => {
    let nextLink;
    let success;
    let username;
    if(req.params.authtoken === TEST_AUTH_TOKEN){//TODO: this is where you check with the database about the authtoken
        nextLink = 'messageHome.html';
        success = true;
        username = TEST_USERNAME;//This should become the username in the database
    }
    else{
        nextLink = 'index.html';
        success = false;
    }

    res.send({'success':success,'nextLink':nextLink,'username':username});
});

const port = 4000;
app.listen(port,function (){ 
    console.log(`Listening on port ${port}`);
});