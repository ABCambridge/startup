const AUTH_KEY = "authtoken";
//TODO: remove this const
const TEST_AUTH_TOKEN = "test_auth_token_1001";
const TEST_USERNAME = "Andrew";
const TEST_PASSWORD = "Cambridge";

function verifyAuthForLogin(){
    const authtoken = localStorage.getItem(AUTH_KEY);
    if(authtoken !== null){
        //VERIFY authtoken with server and get username if it is valid. Else, just go to index.html like normal
        if(authtoken === TEST_AUTH_TOKEN){
            localStorage.setItem("username",TEST_USERNAME);
            window.location.href = "messageHome.html";
        }
    }
}

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
        if(username === TEST_USERNAME && password === TEST_PASSWORD){
            localStorage.setItem("username",username);
            localStorage.setItem(AUTH_KEY,TEST_AUTH_TOKEN);
            window.location.href = "messageHome.html";
        }
        else{
            alert("Invalid login credentials.");
        }
        //END CODE REPLACEMENT BLOCK
    }
}