import React, { useState } from 'react';

const Login = ({ setIsLoggedIn, setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setLoggedInUser(user);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
    </form>
  );
};

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);
    if (user) {
      alert('Username already exists');
      return;
    }
    const newUser = { username, password, email };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    setIsLoggedIn(true);
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
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
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

const LoginAndRegistrationPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  if (isLoggedIn) {
    return (
      <div>
        <h1>Welcome, {loggedInUser.username}!</h1>
        <button onClick={() => { setIsLoggedIn(false); setLoggedInUser(null); }}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <Login setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser} />
      <Register setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default LoginAndRegistrationPage;
