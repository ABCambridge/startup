const AUTH_KEY = "authtoken";
const MESSAGES_KEY = "messages";

async function verifyAuthForMessages(){
    const authtoken = localStorage.getItem(AUTH_KEY);

    const response = await fetch(`/authorize/${authtoken}`,{
        method: 'GET',
        headers: {'content-type':'application/json'}
    });

    const authCheck = await response.json();

    if(!authCheck.success){
        alert("Session authentication failed. Please login again.");
        localStorage.removeItem(AUTH_KEY);
        window.location.href = authCheck.nextLink;
    }
}

verifyAuthForMessages();

let currentConversation = null;
let conversations = null;
let messages = null;


async function retrieveData(){
    const response = await fetch('/conversations',{
        method: 'GET',
        headers: {'content-type':'application/json'}
    });

    const conversationData = await response.json();

    if(conversationData.success){
        conversations = conversationData.conversations;
    }
    else{
        alert('An error occured while retrieving conversation data');
    }

    loadConversations();
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

const introMessage = {
    text:"This is the beginning of your conversation with ",
    type:"systemMessage"
};

async function initialMessageLoad(){
    localStorage.removeItem(MESSAGES_KEY);

    const response = await fetch('/messages',{
        method: 'GET',
        headers: {'content-type':'application/json'}
    });

    const messageData = await response.json();

    if(messageData.success){
        messages = messageData.messages;
        localStorage.setItem(MESSAGES_KEY,JSON.stringify(messages));
    }
    else{
        alert('An error occured while retrieving message data');
    }
}

function updateUserDisplay(){
    document.querySelector("#currentUser").textContent = "Logged in as " + localStorage.getItem("username");
}

function selectConversation(conversation){
    currentConversation = conversation;
    updateConversationHeader();
    loadMessages();
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

let acceptMessages = false;

function loadMessages(){
    //THIS would normally get all of the conversations from the database connected to the current user and selected conversation
    if(currentConversation !== null){
        const messageWindow = document.querySelector("#messages");
        removeChildrenNodes(messageWindow);
        addStartingMessage(messageWindow);

        let loadedMessages = JSON.parse(localStorage.getItem(MESSAGES_KEY));

        loadedMessages.forEach((message) => {
            if(message.user === currentConversation.textContent){
                insertMessage(message,messageWindow);    
            }
        });
    }

    acceptMessages = true;
}

function removeChildrenNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function addStartingMessage(messages){
    let sysMessage = document.createElement('span');
    sysMessage.setAttribute('class','message systemMessage');
    sysMessage.textContent = introMessage.text + currentConversation.textContent + '.';
    messages.appendChild(sysMessage);
}

function insertMessage(message,messageWindow){
    let newMessage = document.createElement('span');
    newMessage.setAttribute('class',`message ${message.type}`);
    newMessage.textContent = message.text;
    messageWindow.appendChild(newMessage);
    updateMessageStorage();
}


function getIncomingMessages(){
    // represents the function that will receive and load the incoming messages from the web socket
    setInterval(() => {
        if(acceptMessages && currentConversation !== null){
            let incomingMessage = {
                text: "Man, CS260 is such a cool class!",
                type: "incomingMessage",
                user: currentConversation.textContent
            }
            messages.push(incomingMessage);//"adding" it to the database
            insertMessage(incomingMessage,document.querySelector("#messages"));
            updateMessageStorage();
        }
    },10000);
}

function updateMessageStorage(){
    localStorage.setItem("messages",JSON.stringify(messages));
}


function sendMessage(){
    if(acceptMessages && currentConversation !== null){
        const inputBox = document.querySelector("#messageBox");
        let outgoingMessage = {
            text: inputBox.value,
            type: "outgoingMessage",
            user: currentConversation.textContent
        }
        messages.push(outgoingMessage);//insert into database
        insertMessage(outgoingMessage,document.querySelector("#messages"));
        updateMessageStorage();
        inputBox.value = "";
    }
}

function logout(){
    localStorage.removeItem(AUTH_KEY);
    
    window.location.href = "index.html";
}