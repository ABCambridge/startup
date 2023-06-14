import React from 'react';
import ReactDOM from 'react-dom/client';
import './login.css';
import { verifyAuthForLogin, login, validateCredentials } from './login';

export function Login({transitionScreen, authorized, setAuth}){
    React.useEffect(() => {
        verifyAuthForLogin()
            .then((response) => {
                return response.json();
            })
            .then((result) =>{
                if(result.success){
                    transitionScreen("messageHome");
                }
            })
    },[]);

    function tryLogin(){
        let credentials = login();

        validateCredentials(credentials.username,credentials.password)
            .then((result) => {
                if(result.success){
                    transitionScreen("messageHome");
                }
            })
    }

    
    return (
        <main className="centeredContent">
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
                    <button type="submit"className="positiveButton"onClick={() => tryLogin()}>Login</button>
                </div>
                <div>
                    <button type="submit"className="alternateButton" onClick={() => transitionScreen("createAccount")}>Create new account</button>
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