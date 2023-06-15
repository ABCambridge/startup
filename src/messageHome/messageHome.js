const USERNAME_KEY = "FastChat_username";
const MESSAGES_KEY = "FastChat_messages";
const OUTGOING_MESSAGE = "outgoingMessage";
const INCOMING_MESSAGE = "incomingMessage";

export { logout, retrieveData, initialMessageLoad }

async function logout(){
    localStorage.removeItem(MESSAGES_KEY);
    localStorage.removeItem(USERNAME_KEY);

    const response = await fetch('/api/logout',{
        method: 'PUT',
        headers: {'content-type':'application/json'}
    });
    const result = await response.json();

    return result.success;
}

async function retrieveData(){
    const response = await fetch(`/api/conversations/${localStorage.getItem(USERNAME_KEY)}`,{
        method: 'GET',
        headers: {'content-type':'application/json'}
    });

    const conversationData = await response.json();

    return conversationData;
}

async function initialMessageLoad(){
    localStorage.removeItem(MESSAGES_KEY);

    const response = await fetch(`/api/messages/${localStorage.getItem(USERNAME_KEY)}`,{
        method: 'GET',
        headers: {'content-type':'application/json'}
    });

    const messageData = await response.json();
    let messages = null;

    if(messageData.success){
        messages = messageData.messages;
        addMessageTypes(messages);
        localStorage.setItem(MESSAGES_KEY,JSON.stringify(messages));
        return {
            success:true,
            "messages":messages
        }
    }
    else{
        return {
            success:false
        };
    }
}

function addMessageTypes(messages){
    if(messages !== null){
        let user = localStorage.getItem(USERNAME_KEY);
        messages.forEach((m) => {
            if(m.sender === user){
                m.type = OUTGOING_MESSAGE;
            }
            else if(m.recipient === user){
                m.type = INCOMING_MESSAGE;
            }
        });
    }
}

let webSocket;

async function startWebSocket(){
    const protocol = (window.location.protocol === 'http:' ? 'ws' : 'wss');
    webSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    webSocket.onopen = (data) => {
        webSocket.send(JSON.stringify({
            "type":"hostUserUpdate",
            "hostUser":window.localStorage.getItem(USERNAME_KEY)
        }));
    };
    webSocket.onclose = (data) => {
        //TODO: do I actually need to do anything here?
    };

    webSocket.onmessage = async (bytes) => {
        let data = JSON.parse(bytes.data);
        if(data.type === "message"){
            let message = JSON.parse(data.message);
            message.type = INCOMING_MESSAGE;
            updateMessageStorage(message);
            loadMessages();
        }
    };
}

startWebSocket();

let currentConversation = null;

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
    if(currentConversation !== null){
        const messageWindow = document.querySelector("#messages");
        removeChildrenNodes(messageWindow);
        addStartingMessage(messageWindow);

        let loadedMessages = JSON.parse(localStorage.getItem(MESSAGES_KEY));

        loadedMessages.forEach((message) => {
            let otherPerson = currentConversation.textContent;
            if(message.sender === otherPerson || message.recipient === otherPerson){
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
    messageWindow.scrollTo(0,messageWindow.scrollHeight);
}

function sendMessage(){
    if(acceptMessages && currentConversation !== null){
        const inputBox = document.querySelector("#messageBox");
        let outgoingMessage = {
            text: inputBox.value,
            type: OUTGOING_MESSAGE,
            sender: localStorage.getItem(USERNAME_KEY),
            recipient: currentConversation.textContent
        }

        updateMessageStorage(outgoingMessage);

        webSocket.send(JSON.stringify({
            "type":"message",
            "message":JSON.stringify(outgoingMessage)
        }));

        insertMessage(outgoingMessage,document.querySelector("#messages"));
        inputBox.value = "";
    }
}

async function updateMessageStorage(newMessage){
    messages.push(newMessage);
    localStorage.setItem(MESSAGES_KEY,JSON.stringify(messages));
}