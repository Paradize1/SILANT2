import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../authReducer';

import MyButton from '../UI/Button/MyButton';



export default function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('client');
    localStorage.removeItem('company');
    localStorage.removeItem('manager');
    dispatch(logout());
  };

  return (
    <MyButton onClick={handleLogout}>Выйти из системы</MyButton>
  );
};