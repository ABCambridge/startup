const AUTH_KEY = "authtoken";
//TODO: remove this const
const TEST_AUTH_TOKEN = "test_auth_token_1001";
const TEST_USERNAME = "Andrew";
const TEST_PASSWORD = "Cambridge";

function preLoad(){
    if(localStorage.getItem("username") === null){
        localStorage.setItem("username",TEST_USERNAME);
    }
    if(localStorage.getItem("password") === null){
        localStorage.setItem("password",TEST_PASSWORD);
    }
}

function verifyAuthForLogin(){
    const authtoken = localStorage.getItem(AUTH_KEY);
    if(authtoken !== null){
        //VERIFY authtoken with server and get username if it is valid. Else, just go to index.html like normal
        if(authtoken === TEST_AUTH_TOKEN){
            window.location.href = "messageHome.html";
        }
    }
}

preLoad();
verifyAuthForLogin();

function login(){
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    validateCredentials(username,password);
}

function validateCredentials(username,password){
    if(username === "" || password === ""){
        alert("Please fill in both the username and password fields.");
    }
    else{
        //THIS IS WHERE YOU CALL THE SERVER AND DETERMINE VALID LOGINS  (call another function)
        if(username === localStorage.getItem("username") && password === localStorage.getItem("password")){
            localStorage.setItem(AUTH_KEY,TEST_AUTH_TOKEN);
            window.location.href = "messageHome.html";
        }
        else{
            alert("Invalid login credentials.");
        }
        //END CODE REPLACEMENT BLOCK
    }
}