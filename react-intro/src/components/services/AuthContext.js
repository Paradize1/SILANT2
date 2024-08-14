// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => localStorage.getItem('isAuthenticated') === 'true'
    );
    const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
    const [usernameDisplay, setUsernameDisplay] = useState(() => localStorage.getItem('username_display')); 
    const [usernameStatus, setUsernameStatus] = useState(() => localStorage.getItem('usernameStatus'));

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username_display', usernameDisplay); 
        localStorage.setItem('usernameStatus', usernameStatus);
    }, [isAuthenticated, userId, usernameDisplay, usernameStatus]);

    const login = (usernameDisplay, id, usernameStatus) => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username_display', usernameDisplay); 
        localStorage.setItem('userId', id);
        localStorage.setItem('usernameStatus', usernameStatus);
        setIsAuthenticated(true);
        setUserId(id);
        setUsernameDisplay(usernameDisplay);
        setUsernameStatus(usernameStatus);
    };

    const logout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username_display'); 
        localStorage.removeItem('userId');
        localStorage.removeItem('usernameStatus');
        setIsAuthenticated(false);
        setUserId(null);
        setUsernameDisplay(null);
        setUsernameStatus(null);
    };

    const getUserData = () => {
        return {
            isAuthenticated,
            userId,
            usernameDisplay,
            usernameStatus,
            login,
            logout
        };
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, usernameDisplay, usernameStatus, login, logout, getUserData }}>
            {children}
        </AuthContext.Provider>
    );
};









