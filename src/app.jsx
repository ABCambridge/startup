import React from 'react';
import { Login } from './login/login.jsx';
import { CreateAccount } from './createAccount/createAccount.jsx';
import { MessageHome } from './messageHome/messageHome.jsx';
import { Settings } from './settings/settings.jsx';
import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App(){
    return (
        <BrowserRouter>
            <div className='body'>
                <header className="pageHeader borderItem">
                    <h1 className="menuButton pageTitle" >FastChat</h1>
                </header>
                <Routes>
                    <Route path='/' element={<Login/>} exact />
                    <Route path='/messageHome' element={<MessageHome/>} exact />
                    <Route path='/createAccount' element={<CreateAccount/>} exact />
                    <Route path='/settings' element={<Settings />} exact />
                </Routes>
                <footer className="borderItem">
                    <a href="https://github.com/ABCambridge/startup.git">Andrew's GitHub for Startup</a>
                    <p>Authored by Andrew Cambridge</p>
                </footer>
            </div>
        </BrowserRouter>
    );
}