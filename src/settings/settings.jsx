import React from 'react';
import '../accountInfo.css';
import { submitChanges } from './settings';
import { useNavigate } from 'react-router-dom';
const USERNAME_KEY = "FastChat_username";

export function Settings(){
    const userName = localStorage.getItem(USERNAME_KEY);
    const nav = useNavigate();

    function processChanges(){
        submitChanges()
            .then((result) => {
                if(result.success){
                    nav('/messageHome');
                }
            });
    }

    return (
        <main className="centeredContent">
        <script src="settings.js"></script>
            <h3>FastChat Settings</h3>
            <div>
                <label htmlFor="username">Username: </label>
                <input type="text"className="inputLocation"id="username"name="usernameText"placeholder={userName}/>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="text"className="inputLocation"id="password"name="passwordText"placeholder="new password"/>
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="text"className="inputLocation"id="confirmPassword"name="confirmPasswordText"placeholder="confirm new password"/>
            </div>
            <div>
                <div>
                    <button onClick={() => processChanges()}className="positiveButton">Submit changes</button>
                </div>
            </div>
            <div>
                   <button className="alternateButton"onClick={() => nav('/messageHome')}>Back to messages</button>
            </div>
        </main>
    );
}