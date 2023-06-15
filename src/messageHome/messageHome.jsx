import React from 'react';
import './messageHome.css';
import { logout, retrieveData, initialMessageLoad } from './messageHome.js'
const USERNAME_KEY = "FastChat_username";

export function MessageHome({ transitionScreen, authorized, setAuth }){
    const [user, setUser] = React.useState(window.localStorage.getItem(USERNAME_KEY));
    const [conversations, setConversations] = React.useState([]);
    const [convoName, setConvoName] = React.useState("(not selected)");
    const [messageBank, setMessageBank] = React.useState([]);

    const systemMessage = {
        text:"This is the beginning of your conversation with ",
        type:"systemMessage"
    };

    React.useEffect(()=>{
        if(!authorized){
            logout()
                .then(()=> {
                    alert("Session authentication failed. Please login again.");
                    transitionScreen("login");
                });
        }
    },[authorized]);

    React.useEffect(() => {
        retrieveData()
            .then((result) => {
                if(result.success){
                    setConversations(result.conversations);
                }
                else{
                    alert('An error occured while retrieving conversation data');
                }
            });
    },[]);

    React.useEffect(() => {
        initialMessageLoad()
            .then((result) => {
                if(result.success){
                    setMessageBank(result.messages);
                }
                else{
                    alert('An error occured while retrieving message data');
                }
            });
    },[]);

    const convoEntries = [];
    if(conversations.length){
        conversations.forEach((convo) => {
            convoEntries.push(
                <span class="conversation" onClick={() => setConvoName(convo)}>
                    {convo}
                </span>
            );
        });
    }

    const currentMessages = [];
    currentMessages.push(
        <span class={"message " + systemMessage.type}>
            {systemMessage.text + convoName}
        </span>
    );
    if(messageBank.length){
        messageBank.forEach((message) => {

            if(message.sender === convoName || message.recipient === convoName){
                currentMessages.push(
                    <span class={"message " + message.type}>
                        {message.text}
                    </span> 
                );   
            }
        });
    }

    function performLogout(){
        logout()
            .then(()=>{
                setAuth(false);
                transitionScreen("login");
            });
    }

    function sendMessage(){
        const box = document.querySelector("#messageBox");
        const input = box.value;
    }

    return (
        <main>
            <div id="headerOptions">
                <nav id="optionsMenu">
                    <div>
                        <button type="submit"className="alternateButton menuButton"onClick={() => performLogout()}id="logoutButton">Logout</button>
                    </div>
                    <form action="settings.html">
                        <button type="submit"className="alternateButton menuButton"id="settingsButton">Settings</button>
                    </form>
                </nav>
                <h5 id="currentUser">Logged in as {user}</h5>
            </div>
            <div id="homeScreen">
                <div id="chatListSidePanel">
                    <h4 id="conversationHeader">Conversations</h4>
                    <div id="conversations" className="containerView">
                        {convoEntries}
                    </div>
                </div>
                <div id="mainMessageScreen">
                    <h4 id="conversationTitle">{"Conversation with " + convoName}</h4>
                    <span id="messages" className="containerView">
                        {currentMessages}
                    </span>
                    <div id="inputBar">
                        <textarea id="messageBox" className="inputLocation"name="newMessage" rows="1" columns="1"></textarea>
                        <button id="sendButton" type="submit"onClick={() => sendMessage()}className="positiveButton">Send</button>
                    </div>
                </div>
            </div>
        </main>
    );
}