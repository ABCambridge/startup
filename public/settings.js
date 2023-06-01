const AUTH_KEY = "authtoken";
const USERNAME_KEY = "username";

async function submitChanges(){
    let newUsername = document.getElementById("username").value;
    let newPassword = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if(newUsername === "" || newPassword === "" || confirmPassword === ""){
        alert("Please fill in all fields.");
    }
    else if(newPassword !== confirmPassword){
        alert("Passwords do not match. Please ensure they match");
    }
    else{
        let updatedUser = {
            "oldUsername":localStorage.getItem(USERNAME_KEY),
            "newUsername":newUsername,
            "newPassword":newPassword
        }

        const response = await fetch("/user",{
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body:JSON.stringify(updatedUser)
        });

        const result = await response.json();

        if(result.success){
            localStorage.setItem(USERNAME_KEY,result.username);
            localStorage.setItem(AUTH_KEY,result.authtoken);
            window.location.href = result.nextLink;
        }
        else{
            alert(result.message);
        }
    }
}

async function fillFields(){
    const response = await fetch(`/authorize/${localStorage.getItem(AUTH_KEY)}`);
    const result = await response.json();

    if(!result.success){
        alert("Authentication session failed.")
        window.location.href = result.nextLink;
    }

    document.getElementById("username").value = localStorage.getItem(USERNAME_KEY);
}