import React from 'react';
import './login.css';

export function Login(){
    return (
        <main className="centeredContent">
            <script src="login.js"></script>
            <div id="loginInformation">
                <h3>Login to FastChat </h3>
                <div>
                    <label for="username">Username: </label>
                    <input type="text"className="inputLocation"id="username"name="usernameText"placeholder="username here"/>
                </div>
                <div>
                    <label for="password">Password: </label>
                    <input type="text"className="inputLocation"id="password"name="passwordText"placeholder="password here"/>
                </div>
                <div>
                    <button type="submit"className="positiveButton"onclick="login()">Login</button>
                </div>
                <div>
                    <form action="createAccount.html">
                        <button type="submit"className="alternateButton">Create new account</button>
                    </form>
                </div>
            </div>
            <div id="loginDecorations">
                <div>
                        <p id="quote"></p>
                        <p><i id="author"></i></p>
                </div>  
                <script>
                    getQuote();
                </script>
                <image id="introImage" src="./FastChat_Logo.png"alt="FastChat Logo"width="300"/>
            </div>
        </main>
    );
}