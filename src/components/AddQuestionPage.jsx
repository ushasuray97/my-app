import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddQuestionPage.css';

const AddQuestionPage = () => {
  const [title, setTitle] = useState('');
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = parseInt(new Date().getTime().toString(),10);
    const newQuestion = { id, title, answer: '' };
    const updatedQuestions = [...JSON.parse(localStorage.getItem('questions') || '[]'), newQuestion];

    localStorage.setItem('questions', JSON.stringify(updatedQuestions));

    history('/');
  };

  return (
    <>
    <Link to={'/'}><h2>Quora</h2></Link>
    <div className="add-question-page">
      <h1>Add Question</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Question Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add Question</button>
        <button type="button" onClick={() => history('/')}>
          Cancel
        </button>
      </form>
    </div>
    </>
  );
  
};

export default AddQuestionPage;
