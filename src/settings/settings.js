const USERNAME_KEY = "FastChat_username";

export {submitChanges}

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

        const response = await fetch("/api/user",{
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body:JSON.stringify(updatedUser)
        });

        const result = await response.json();

        if(result.success){
            localStorage.setItem(USERNAME_KEY,result.username);
            return{
                success:true
            };
        }
        else{
            alert(result.message);
            return{
                success:false
            };
        }
    }
}