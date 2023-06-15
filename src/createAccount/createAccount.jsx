import React from 'react';
import '../accountInfo.css';
import { createAccount } from './createAccount';

export function CreateAccount({transitionScreen, authorized, setAuth}){

    function tryCreation(){
        createAccount()
            .then((result) => {
                if(result.success){
                    setAuth(true);
                    transitionScreen("messageHome");
                }
            });
    }

    return (
        <main className="centeredContent">
            <script src="createAccount.js"></script>
            <h3>Create New FastChat Account</h3>
            <div>
                <label for="username">Username: </label>
                <input type="text"className="inputLocation"id="username"name="usernameText"placeholder="username here"/>
            </div>
            <div>
                <label for="password">Password: </label>
                <input type="text"className="inputLocation"id="password"name="passwordText"placeholder="password here"/>
            </div>
            <div>
                <label for="confirmPassword">Confirm Password: </label>
                <input type="text"className="inputLocation"id="confirmPassword"name="confirmPasswordText"placeholder="password here"/>
            </div>
            <div>
                <div>
                    <button type="submit"onClick={() => tryCreation()}className="positiveButton">Create New Account</button>
                </div>
            </div>
            <div>
                <button type="submit"className="alternateButton"onClick={() => transitionScreen("login")}>Back to Login screen</button>
            </div>
        </main>
    );
}