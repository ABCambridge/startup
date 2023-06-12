const USERNAME_KEY = "FastChat_username";
async function createAccount(){
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
        let newUser = {
            "newUsername":newUsername,
            "newPassword":newPassword
        }

        const response = await fetch('/user',{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body:JSON.stringify(newUser)
        });

        const result = await response.json();

        if(result.success){
            localStorage.setItem(USERNAME_KEY,result.username);
            window.location.href = result.nextLink;
        }
        else{
            alert(result.message);
        }
    }
}