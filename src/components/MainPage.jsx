import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
const MainPage = () => {
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
    <div className='main-page-container'>
      <div >
        {/* <h1>All Questions</h1> */}
        {/* <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} /> */}
        <ul>
          {questions.answer&&filteredQuestions.map((question) => (
            <li key={question.id}>
              <h2>{question.title}</h2>
              {/* <p>{question.answer ? question.answer : 'No answer yet.'}</p> */}
            </li>
          ))}
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
  );
};

export default MainPage;
