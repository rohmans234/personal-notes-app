// src/pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login } from '../utils/network-data';

function LoginPage({ loginSuccess }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onLogin = async (event) => {
    event.preventDefault();
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <section className='login-page'>
      <h2>Login</h2>
      <form onSubmit={onLogin} className='input-login'>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={onEmailChange} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={onPasswordChange} />
        <button type="submit">Login</button>
      </form>
      <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
    </section>
  );
}

export default LoginPage;