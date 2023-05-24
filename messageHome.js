const AUTH_KEY = "authtoken";
//TODO: remove this const
const TEST_AUTH_TOKEN = "test_auth_token_1001";
const TEST_USERNAME = "Andrew";
const TEST_PASSWORD = "Cambridge";

let currentConversation = null;
//"conversations" represents the different conversations that will be loaded in from the database
const conversations = ["Jimmy","Joseph","Dave","Catherine","Stephanie","Emma","Erin"];
//"messages" represents the conversations that would be loaded in from the database based on which conversation is opened
const introMessage = {
    text:"This is the beginning of your conversation with ",
    type:"systemMessage"
};
const messages = [
    {
        text:"hi there, how are you?",
        type:"incomingMessage",
        user:"Jimmy"
    },
    {
        text:"I am doing well, how about yourself?",
        type:"outgoingMessage",
        user:"Jimmy"
    },
    {
        text:"what's up?",
        type:"incomingMessage",
        user:"Joseph"
    },
    {
        text:"hey Emma, how are you doing?",
        type:"outgoingMessage",
        user:"Emma"
    },
    {
        text:"I'm good",
        type:"incomingMessage",
        user:"Emma"
    },
    {
        text:"hey Stephanie, how are you doing?",
        type:"outgoingMessage",
        user:"Stephanie"
    },
    {
        text:"cool",
        type:"incomingMessage",
        user:"Stephanie"
    },
    {
        text:"I won the lottery!",
        type:"outgoingMessage",
        user:"Erin"
    },
    {
        text:"nice!",
        type:"incomingMessage",
        user:"Erin"
    }
];

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
        const messageWindow = document.querySelector("#messages");
        removeChildrenNodes(messageWindow);
        addStartingMessgae(messageWindow);

        messages.forEach((message) => {
            if(message.user === currentConversation.textContent){
                let newMessage = document.createElement('span');
                newMessage.setAttribute('class',`message ${message.type}`);
                newMessage.textContent = message.text;
                messageWindow.appendChild(newMessage);
            }
        });
    }

    randomMessageGeneration();
}

function removeChildrenNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function addStartingMessgae(messages){
    let sysMessage = document.createElement('span');
    sysMessage.setAttribute('class','message systemMessage');
    sysMessage.textContent = introMessage.text + currentConversation.textContent + '.';
    messages.appendChild(sysMessage);
}

function randomMessageGeneration(){

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