const AUTH_KEY = "authtoken";
//TODO: remove this const
const TEST_AUTH_TOKEN = "test_auth_token_1001";
const TEST_USERNAME = "Andrew";
const TEST_PASSWORD = "Cambridge";

function submitChanges(){
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
        //hypothetically, a new authtoken would also be created and updated in local memory
        window.location.href = "messageHome.html";
    }
}

function fillFields(){
    //WILL EVENTUALLY GATHER DATA FROM DATABASE
    document.getElementById("username").value = TEST_USERNAME;
    //get password from database here, using the authentication token
    if(localStorage.getItem(AUTH_KEY) === TEST_AUTH_TOKEN){
        document.getElementById("password").value = TEST_PASSWORD;
        document.getElementById("confirmPassword").value = TEST_PASSWORD;
    }
    else{
        alert("Authentication session failed.")
        window.location.href = "index.html";
    }
}