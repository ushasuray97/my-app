import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
const MainPage = ({isLoggedIn}) => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Retrieve questions from localStorage
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(storedQuestions);
    setFilteredQuestions(storedQuestions);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = questions.filter((question) =>
      question.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredQuestions(filtered);
  };

  return (
    <>
    <div>
      <nav>
      <div className="logo">
        <Link to="/" style={{color:'red'}}>Quora</Link>
      </div>
      <div className="search-bar">
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
      </div>
      <div className="nav-links">
        <ul>
        
    <li>
      <Link to="/add-question" style={{backgroundColor:'red', color:'white' , padding:'10px',border:'2px solid red',borderRadius:'10px'}}>Add Question</Link>
    </li>
    <li>
      <Link to="/add-answer" style={{backgroundColor:'red', color:'white' , padding:'10px',border:'2px solid red',borderRadius:'10px'}}>Add Answer</Link>
    </li>
  
          <li>
            <Link to="/login" style={{backgroundColor:'red', color:'white' , padding:'10px',border:'2px solid red',borderRadius:'10px'}}>
                  {isLoggedIn ? 'Logout' : 'Login'}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
    <div className='main-page-container'>
      <div >   
        <ul>
          <div>
          {questions.answer&&filteredQuestions.map((question) => (
            <li key={question.id}>
              <h2>{question.title}</h2>
              <p>{question.answer}</p>
            </li>
          ))}
          </div>
        </ul>
      </div>
      <div className='ques' >
        <h1>Question List</h1>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              {question.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default MainPage;
