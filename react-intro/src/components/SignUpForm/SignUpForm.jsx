import React from 'react';
import LoginForm from './LoginForm'; // Подключение компонента LoginForm
import './SignUpForm.css'; // Подключение стилей

function SignUpForm() {
    return (
        <div className="SignUpForm">
            <LoginForm />
        </div>
    );
}

export default SignUpForm;