import React from 'react';
import './messageHome.css';

export function MessageHome(){
    return (
        <main>
            <script src="messageHome.js"></script>
            <div id="headerOptions">
                <nav id="optionsMenu">
                    <div>
                        <button type="submit"className="alternateButton menuButton"onclick="logout()"id="logoutButton">Logout</button>
                    </div>
                    <form action="settings.html">
                        <button type="submit"className="alternateButton menuButton"id="settingsButton">Settings</button>
                    </form>
                </nav>
                <h5 id="currentUser">Logged in as user1</h5>
                <script>
                    updateUserDisplay();
                </script>
            </div>
            <div id="homeScreen">
                <div id="chatListSidePanel">
                    <h4 id="conversationHeader">Conversations</h4>
                    <div id="conversations" className="containerView">
                    </div>
                </div>
                <script>
                    retrieveData();
                </script>
                <div id="mainMessageScreen">
                    <h4 id="conversationTitle">Conversation with User2</h4>
                        <script>
                            updateConversationHeader();
                        </script>
                    <span id="messages" className="containerView"></span>
                    <div id="inputBar">
                        <textarea id="messageBox" className="inputLocation"name="newMessage" rows="1" columns="1"></textarea>
                        <button id="sendButton" type="submit"onclick="sendMessage()"className="positiveButton">Send</button>
                    </div>
                </div>
            </div>
            <script>
                initialMessageLoad();
            </script>
        </main>
    );
}