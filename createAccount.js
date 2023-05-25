const AUTH_KEY = "authtoken";
const TEST_AUTH_TOKEN = "test_auth_token_1001";
function createAccount(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    if(username === "" || password === "" || confirmPassword === ""){
        alert("Please fill in all fields.");
    }
    else if(password !== confirmPassword){
        alert("Passwords do not match. Please ensure they match");
    }
    else{
        //place request to server, see if there is an issue with unique values. Otherwise, process request and login.
        localStorage.setItem("username",username);
        localStorage.setItem("password",password);
        localStorage.setItem(AUTH_KEY,TEST_AUTH_TOKEN);
        //hypothetically, a new authtoken would also be created and updated in local memory
        window.location.href = "messageHome.html";
    }
}