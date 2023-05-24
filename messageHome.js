const AUTH_KEY = "authtoken";
//TODO: remove this const
const TEST_AUTH_TOKEN = "test_auth_token_1001";
const TEST_USERNAME = "Andrew";
const TEST_PASSWORD = "Cambridge";

let currentConversation = null;
//"conversations" represents the different conversations that will be loaded in from the database
const conversations = ["Jimmy","Joseph","Dave","Catherine","Stephanie","Emma","Erin"];
const messages = ["hi there, how are you?","I am doing well, how about yourself","what's up","I'm good","cool","nice!"];

verifyAuth();

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

function updateUserDisplay(){
    document.querySelector("#currentUser").textContent = "Logged in as " + localStorage.getItem("username");
}

function updateConversationHeader(){
    let title;
    if(currentConversation === null){
        title = "Please select a conversation";
    }
    else{
        title = "Conversation with " + currentConversation.textContent;
    }

    document.querySelector("#conversationTitle").textContent = title;
}

function loadConversations(){
    const convoList = document.querySelector("#conversations");
    conversations.forEach((a) => {
        let convoItem = document.createElement('span');
        convoItem.setAttribute('class','conversation');
        convoItem.setAttribute('onclick','selectConversation(this)');
        convoItem.textContent = a;
        convoList.appendChild(convoItem);
    });
}

function loadMessages(){
    //THIS would normally get all of the conversations from the database connected to the current user and selected conversation
    if(currentConversation !== null){
        const messages = document.getElementById("messages");
        messages.forEach((message) => {
            let newMessage = document.createElement('span');
            newMessage.setAttribute("class","message");
            newMessage.textContent = message;
            messages.appendChild(newMessage);
        });
    }
}

function selectConversation(conversation){
    currentConversation = conversation;
    updateConversationHeader();
    loadMessages();
}

function logout(){
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("username");
    window.location.href = "index.html";
}