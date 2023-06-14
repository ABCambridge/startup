import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from './login/login.jsx';
import { CreateAccount } from './createAccount/createAccount.jsx';
import { MessageHome } from './messageHome/messageHome.jsx';
import { Settings } from './settings/settings.jsx';
import './app.css';

export default function App(){
    const [child, setChild] = React.useState("login");
    const [authorized, setAuth] = React.useState(false);
    let Next = getChild(child);

    return (
        <div className='body'>
            <header className="pageHeader borderItem">
                <h1 className="menuButton pageTitle" >FastChat</h1>
            </header>
            <Next transitionScreen={setChild} authorized={authorized} setAuth={setAuth} />
            <footer className="borderItem">
                <a href="https://github.com/ABCambridge/startup.git">Andrew's GitHub for Startup</a>
                <p>Authored by Andrew Cambridge</p>
            </footer>
        </div>
    );
}

function getChild(childName){
    if(childName === "messageHome"){
        return MessageHome;
    }
    else if(childName === "createAccount"){
        return CreateAccount;
    }
    else if(childName === "settings"){
        return Settings;
    }
    else {
        return Login;
    }
}