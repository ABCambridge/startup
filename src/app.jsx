import React from 'react';
import { BrowswerRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login.jsx';
import { CreateAccount } from './createAccount/createAccount.jsx';
import { MessageHome } from './createAccount/createAccount.jsx';
import { Settings } from './settings/settings.jsx';
import './app.css';

export default function App(){
    return (
    <BrowswerRouter>
        <div className='body'>
            <header className="pageHeader borderItem">
                <h1 className="menuButton pageTitle" >FastChat</h1>
            </header>
            <main className="centeredContent">
                App content here
            </main>
            <footer className="borderItem">
                <a href="https://github.com/ABCambridge/startup.git">Andrew's GitHub for Startup</a>
                <p>Authored by Andrew Cambridge</p>
            </footer>
        </div>
    </BrowswerRouter>
    );
}