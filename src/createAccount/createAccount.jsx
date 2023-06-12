import React from 'react';
import '../accountInfo.css';

export function CreateAccount(){
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
                    <button type="submit"onclick="createAccount()"className="positiveButton">Create New Account</button>
                </div>
            </div>
            <div>
                <form action="index.html">
                    <button type="submit"className="alternateButton">Back to Login screen</button>
                </form>
            </div>
        </main>
    );
}