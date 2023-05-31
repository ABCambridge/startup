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

async function verifyAuthForLogin(){
    const authtoken = localStorage.getItem(AUTH_KEY);
    // let respJson = await response.json();
    // console.log(respJson);
    // console.log(respJson.message);
    if(authtoken !== null){
        const response = await fetch (`/login/${authtoken}`,{
            method: 'GET',
            headers: {'content-type':'application/json'}
        });
        
        const authCheck = await response.json();
        if(!authCheck.success){
            localStorage.removeItem(AUTH_KEY);
        }
        window.location.href = authCheck.nextLink;
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