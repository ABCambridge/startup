const USERNAME_KEY = "FastChat_username";

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
    const response = await fetch('https://api.goprogram.ai/inspiration',{
        method: 'GET'
    });

    const result = await response.json();

    document.getElementById("quote").textContent = result.quote;
    document.getElementById("author").textContent = result.author;
}

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
            localStorage.setItem(USERNAME_KEY,loginResult.username);
            window.location.href = loginResult.nextLink;
        }
        else{
            alert("Invalid login credentials.");
        }
    }
}

export { verifyAuthForLogin }