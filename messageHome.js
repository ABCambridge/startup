const AUTH_KEY = "authtoken";
//TODO: remove this const
const TEST_AUTH_TOKEN = "test_auth_token_1001";
const TEST_USERNAME = "Andrew";
const TEST_PASSWORD = "Cambridge";

function verifyAuth(){
    const authtoken = localStorage.getItem(AUTH_KEY);
    //TODO: verify authoken with the database. Reject if not found
    if(authtoken !== TEST_AUTH_TOKEN){
        window.location.href = "index.html";
        alert("Session authentication failed.");
    }
    else{
        
    }
}

verifyAuth();

function updateUserDisplay(){
    
}

updateUserDisplay();

function logout(){
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("username");
    window.location.href = "index.html";
}