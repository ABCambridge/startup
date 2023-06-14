import React from 'react';
import ReactDOM from 'react-dom/client';
import './login.css';
import { verifyAuthForLogin, login, validateCredentials, getQuote } from './login';

export function Login({transitionScreen, authorized, setAuth}){
    const [quote, setQuote] = React.useState(null);
    const [author, setAuthor] = React.useState(null);

    React.useEffect(() => {
        verifyAuthForLogin()
            .then((result) =>{
                if(result.success){
                    setAuth(true);
                    transitionScreen("messageHome");
                }
            })
    },[]);

    React.useEffect(() => {
        getQuote()
            .then((result) => {
                setQuote(result.quote);
                setAuthor(result.author);
            });
    },[]);

    function tryLogin(){
        let credentials = login();

        validateCredentials(credentials.username,credentials.password)
            .then((result) => {
                if(result.success){
                    setAuth(true);
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
                        <p id="quote">{quote}</p>
                        <p><i id="author">{author}</i></p>
                </div>  
                <script>
                    getQuote();
                </script>
                <image id="introImage" src="./FastChat_Logo.png"alt="FastChat Logo"width="300"/>
            </div>
        </main>
    );
}