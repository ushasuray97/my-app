import { useState } from "react";
import { Link } from "react-router-dom";
import './Register.css';
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
      <>
      <Link to={'/'}><h2>Quora</h2></Link>
      <form className="register-form" onSubmit={handleRegister}>
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
        <br/>
        Already have an account <Link to={'/login'}>Click here to login</Link>
      </form>
      </>
    );
  };
export default Register;  