const AUTH_KEY = "authtoken";
const USERNAME_KEY = "username";

async function verifyAuthForLogin(){
    const authtoken = localStorage.getItem(AUTH_KEY);

    if(authtoken !== null){
        const response = await fetch (`/authorize/${authtoken}`,{
            method: 'GET',
            headers: {'content-type':'application/json'}
        });
        
        const authCheck = await response.json();

        if(!authCheck.success){
            localStorage.removeItem(AUTH_KEY);
        }
        else{
            localStorage.setItem(USERNAME_KEY,authCheck.username)
        }
        window.location.href = authCheck.nextLink;
    }
}

verifyAuthForLogin();

function login(){
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    validateCredentials(username,password);
}

async function validateCredentials(username,password){
    if(username === "" || password === ""){
        alert("Please fill in both the username and password fields.");
    }
    else{
        const response = await fetch(`/login/${username}/${password}`,{
            method: 'GET',
            headers: {'content-type':'application/json'},
        });

        const loginResult = await response.json();

        if(loginResult.success){
            localStorage.setItem(AUTH_KEY,loginResult.authtoken);
            localStorage.setItem(USERNAME_KEY,loginResult.username);
            window.location.href = loginResult.nextLink;
        }
        else{
            alert("Invalid login credentials.");
        }
    }
}