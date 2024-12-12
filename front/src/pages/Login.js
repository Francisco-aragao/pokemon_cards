import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    console.log('Logging in with:', { username, password });

    navigate('/');
  };

  return (
    <div>
      <Header />
      <h1 className="center-login-header">Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default Login;
