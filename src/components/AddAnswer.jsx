import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddAnswer.css';
const AddAnswer = ({questions,onAddAnswer}) => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    // Retrieve question from localStorage
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    const storedQuestion = storedQuestions.find((question) => question.id === questionId);
    setQuestion(storedQuestion);
  }, [questionId]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const history=useNavigate();

  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedQuestion !== '' && answer !== '') {
      const question = questions.find((q) => q.id === parseInt(selectedQuestion));
      if (question) {
        const newAnswer = {
          id: Date.now(),
          questionId: question.id,
          answer: answer,
          username: localStorage.getItem('username'),
        };
        onAddAnswer(newAnswer);
        history('/');
      }
    }
  };

  return (
    <div className="container">
      <h1>Add Answer</h1>
      {questions ? (
        questions.map((question) => (
          <option key={question.id} value={question.id}>
            {question.title}
          </option>
        ))
      ) : (
        <div>
          <p>Question not found.</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="answerInput">Answer:</label>
          <textarea
            className="form-control"
            id="answerInput"
            rows="3"
            value={answer}
            onChange={handleAnswerChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Add Answer
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => history('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddAnswer;
