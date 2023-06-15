const USERNAME_KEY = "FastChat_username";
const MESSAGES_KEY = "FastChat_messages";
const OUTGOING_MESSAGE = "outgoingMessage";
const INCOMING_MESSAGE = "incomingMessage";

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

class SocketProxy{
    messages = JSON.parse(localStorage.getItem(MESSAGES_KEY));
    started = false;

    constructor(){
        const protocol = (window.location.protocol === 'http:' ? 'ws' : 'wss');
        this.webSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.webSocket.onopen = (data) => {
            this.webSocket.send(JSON.stringify({
                "type":"hostUserUpdate",
                "hostUser":window.localStorage.getItem(USERNAME_KEY)
            }));
        };
        this.webSocket.onclose = (data) => {
            //intentionally blank
        };
    }

    start(updatingFunction){
        this.webSocket.onmessage = async (bytes) => {
            let data = JSON.parse(bytes.data);
            if(data.type === "message"){
                let message = JSON.parse(data.message);
                message.type = INCOMING_MESSAGE;
                this.updateMessageStorage(message);
                updatingFunction(message);
            }
        };

        this.started = true;
    }

    sendMessage(value, sender, recipient){
        if(this.started && recipient !== "(not selected)"){
            let outgoingMessage = {
                text: value,
                type: OUTGOING_MESSAGE,
                sender: sender,
                recipient: recipient
            }
    
            this.updateMessageStorage(outgoingMessage);
    
            this.webSocket.send(JSON.stringify({
                "type":"message",
                "message":JSON.stringify(outgoingMessage)
            }));

            console.log(outgoingMessage);

            return{
                success:true,
                message:outgoingMessage
            };
        }
        else{
            return {
                success:false
            };
        }
    }
    
    updateMessageStorage(newMessage){
        this.messages.push(newMessage);
        localStorage.setItem(MESSAGES_KEY,JSON.stringify(this.messages));
    }
}

const Proxy = new SocketProxy();

export { logout, retrieveData, initialMessageLoad, Proxy }