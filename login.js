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
        if(username === "Andrew" && password === "Cambridge"){
            const authtoken = "test_auth_token_1001";
            localStorage.setItem("username",username);
            localStorage.setItem("authtoken",authtoken);
            window.location.href = "messageHome.html";
        }
        else{
            alert("Invalid login credentials.");
        }
        //END CODE REPLACEMENT BLOCK
    }
}