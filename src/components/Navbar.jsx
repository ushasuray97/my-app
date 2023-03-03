import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">Quora</Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <Link to="/add-question">Add Question</Link>
          </li>
          <li>
            <Link to="/add-answer">Add Answer</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
