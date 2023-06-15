import React from 'react';
import '../accountInfo.css';
import { submitChanges } from './settings';
const USERNAME_KEY = "FastChat_username";

export function Settings({transitionScreen, authorized, setAuth}){
    const userName = localStorage.getItem(USERNAME_KEY);

    function processChanges(){
        submitChanges()
            .then((result) => {
                if(result.success){
                    transitionScreen("messageHome");
                }
            });
    }

    return (
        <main className="centeredContent">
        <script src="settings.js"></script>
            <h3>FastChat Settings</h3>
            <div>
                <label for="username">Username: </label>
                <input type="text"className="inputLocation"id="username"name="usernameText"placeholder={userName}/>
            </div>
            <div>
                <label for="password">Password: </label>
                <input type="text"className="inputLocation"id="password"name="passwordText"placeholder="new password"/>
            </div>
            <div>
                <label for="confirmPassword">Confirm Password: </label>
                <input type="text"className="inputLocation"id="confirmPassword"name="confirmPasswordText"placeholder="confirm new password"/>
            </div>
            <div>
                <div>
                    <button type="submit"onClick={() => processChanges()}className="positiveButton">Submit changes</button>
                </div>
            </div>
            <div>
                   <button type="submit"className="alternateButton"onClick={() => transitionScreen("messageHome")}>Back to messages</button>
            </div>
        </main>
    );
}