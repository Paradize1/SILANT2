import React, { useState } from 'react';
import './SignUpForm.css';
import useLogin from './Login';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { error, login } = useLogin(); // Используем кастомный хук

    const handleLogin = async (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className="login-form">
            <h2>Вход в систему</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Логин:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Введите логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default LoginForm;

