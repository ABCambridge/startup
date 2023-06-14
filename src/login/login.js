const USERNAME_KEY = "FastChat_username";

export { verifyAuthForLogin, login, validateCredentials, getQuote }

async function verifyAuthForLogin(){
    const response = await fetch (`/api/authorize`,{
        method: 'GET',
        headers: {'content-type':'application/json'}
    });
    
    const authCheck = await response.json();

    if(authCheck.success){
        localStorage.setItem(USERNAME_KEY,authCheck.username);
        return {
            success: true,
            username: authCheck.username
        }
    }
    else{
        return {
            success: false
        }
    }
}

async function getQuote(){
    const response = await fetch('https://api.quotable.io/quotes/random',{
        method: 'GET',
        headers: {'content-type':'application/json'}
    });

    const result = await response.json();

    return {
        quote: result[0].content,
        author: result[0].author
    }
}

function login(){
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    return {
        "username":username,
        "password":password
    }
}

async function validateCredentials(username,password){
    if(username === "" || password === ""){
        alert("Please fill in both the username and password fields.");
    }
    else{
        const response = await fetch(`/api/login/${username}/${password}`,{
            method: 'GET',
            headers: {'content-type':'application/json'},
        });

        const loginResult = await response.json();

        if(loginResult.success){
            localStorage.setItem(USERNAME_KEY,loginResult.username);
            return{
                success:true,
                username: loginResult.username
            }
        }
        else{
            alert("Invalid login credentials.");
            return{
                success:false
            }
        }
    }
}