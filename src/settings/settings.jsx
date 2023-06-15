import React from 'react';
import '../accountInfo.css';

export function Settings({transitionScreen, authorized, setAuth}){
    return (
        <main className="centeredContent">
        <script src="settings.js"></script>
            <h3>FastChat Settings</h3>
            <div>
                <label for="username">Username: </label>
                <input type="text"className="inputLocation"id="username"name="usernameText"placeholder="new username"/>
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
                    <button type="submit"onclick="submitChanges()"className="positiveButton">Submit changes to settings</button>
                </div>
            </div>
            <div>
                   <button type="submit"className="alternateButton"onClick={() => transitionScreen("messageHome")}>Back to messages</button>
            </div>
        </main>
    );
}