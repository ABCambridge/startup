import React from 'react';
import './messageHome.css';
import { verifyAuthForLogin,logout, retrieveData, initialMessageLoad, Proxy } from './messageHome.js'
import { useNavigate } from 'react-router-dom';
const USERNAME_KEY = "FastChat_username";

export function MessageHome(){
    const user = window.localStorage.getItem(USERNAME_KEY);
    const [conversations, setConversations] = React.useState([]);
    const [convoName, setConvoName] = React.useState("(not selected)");
    const [messageBank, setMessageBank] = React.useState([]);
    const [boxValue, setBoxValue] = React.useState("");
    const nav = useNavigate();

    const systemMessage = {
        text:"This is the beginning of your conversation with ",
        type:"systemMessage"
    };

    React.useEffect(()=>{
        verifyAuthForLogin()
            .then((result) => {
                if(!result.success){
                    alert("Session authentication failed. Please login again.");
                    nav('/');
                }
            });
    },[]);

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

    React.useEffect(() => {
        let messageWindow = document.querySelector("#messages");
        messageWindow.scrollTo(0,messageWindow.scrollHeight);
    },[convoName,messageBank]);

    const convoEntries = [];
    if(conversations.length){
        conversations.forEach((convo) => {
            convoEntries.push(
                <span className="conversation" onClick={() => setConvoName(convo)}>
                    {convo}
                </span>
            );
        });
    }

    const currentMessages = [];
    if(convoName !== "(not selected)"){
        currentMessages.push(
            <span className={"message " + systemMessage.type}>
                {systemMessage.text + convoName}
            </span>
        );
    }
    if(messageBank.length){
        messageBank.forEach((message) => {

            if(message.sender === convoName || message.recipient === convoName){
                currentMessages.push(
                    <span className={"message " + message.type}>
                        {message.text}
                    </span> 
                );   
            }
        });
    }

    function handleIncomingMessage(message){
        console.log(message);
        setMessageBank([...messageBank,message]);
    }

    Proxy.start(handleIncomingMessage);

    function performLogout(){
        logout()
            .then(()=>{
                nav('/');
            });
    }

    function sendMessage(){
        const box = document.querySelector("#messageBox");
        const input = box.value;
        let result = Proxy.sendMessage(input,user,convoName);
        if(result.success){
            handleIncomingMessage(result.message);
            setBoxValue("");
        }
        else{
            alert("Message failed to send");
        }
    }

    return (
        <main>
            <div id="headerOptions">
                <nav id="optionsMenu">
                    <div>
                        <button className="alternateButton menuButton"onClick={() => performLogout()}id="logoutButton">Logout</button>
                    </div>
                    <div>
                        <button className="alternateButton menuButton"onClick={() => nav('/settings')}id="settingsButton">Settings</button>
                    </div>
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
                        <textarea id="messageBox" className="inputLocation"value={boxValue}onChange={() => setBoxValue()}name="newMessage" rows="1" columns="1">{boxValue}</textarea>
                        <button id="sendButton" type="submit"onClick={() => sendMessage()}className="positiveButton">Send</button>
                    </div>
                </div>
            </div>
        </main>
    );
}