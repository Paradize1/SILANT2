import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import './Header.css';

function Header() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="header">
            <div className="top-section">
                <div className="logo"></div>
                <div className="contacts">
                    <h3>тел: +7-8352-20-12-09, telegram</h3>
                </div>
                {isAuthenticated ? (
                    <button className="sign-up" onClick={handleLogoutClick}>выйти</button>
                ) : (
                    <button className="sign-up" onClick={handleLoginClick}>авторизация</button>
                )}
            </div>
            <div className="title">
                <h1>Электронная сервисная книжка "Мой Силант"</h1>
            </div>
        </div>
    );
}

export default Header;


