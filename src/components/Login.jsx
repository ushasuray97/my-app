import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
const Login = ({ setIsLoggedIn, setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setLoggedInUser(user);
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <>
    <Link to={'/'}><h2>Quora</h2></Link>
    <form className='login-form' onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Login</button>
      <br/>
      Not have Account <Link to={'/register'}>Click here to register</Link>
    </form>
    </>
  );
};



export default Login;
