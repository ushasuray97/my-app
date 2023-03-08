import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './AddAnswer.css';

const AddAnswer = ({ questions, onAddAnswer, setQuestions }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const history = useNavigate();

  useEffect(() => {
    if (id) {
      // Retrieve question from localStorage
      const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
      const storedQuestion = storedQuestions.find((question) => question.id === parseInt(id, 10));
      setQuestion(storedQuestion);
    }
  }, [id]);

  useEffect(() => {
    console.log(question);
  }, [question]);

  useEffect(() => {
    // Retrieve questions from localStorage
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(storedQuestions);
    // setFilteredQuestions(storedQuestions);
  }, []);

  const handleQuestionChange = (questionId) => {
    console.log(questionId);
    setSelectedQuestion(questionId);
    if (questions) {
      const selectedQuestion = questions.find((q) => q.id === parseInt(questionId, 10));
      setQuestion(selectedQuestion);
    }
  };
  
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedQuestion !== '' && answer !== '') {
      const questionIndex = questions.findIndex((q) => q.id === parseInt(selectedQuestion, 10));
      if (questionIndex >= 0) {
        const question = questions[questionIndex];
        const updatedAnswer = [...question.answer, answer]; // Add the answer value to the existing answer array
        const updatedQuestion = {
          ...question,
          answer: updatedAnswer,
        };
        const updatedQuestions = [        ...questions.slice(0, questionIndex),        updatedQuestion,        ...questions.slice(questionIndex + 1),      ];
        setQuestions(updatedQuestions);
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        setQuestion(updatedQuestion);
        setAnswer('');
        history('/');
      }
    }
  };
  
  
  
  return (
    <>
      <Link to={'/'}>
        <h2>Quora</h2>
      </Link>
      <div className="container">
        <div>
          {/* <h1>Add Answer</h1> */}

          {questions ? (
            <ul>
              {questions.map((question) => (
                <li key={question.id}>
                  <Link to={`/add-answer/${question.id}`} onClick={() => handleQuestionChange(question.id)}>
                    {question.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p>Question not found.</p>
            </div>
          )}
        </div>
        <div>
          <form className="ans-form" onSubmit={handleSubmit}>
            <div className="form-group">
              {/* <label htmlFor="answerInput">Answer:</label> */}
              <textarea
                className="form-control"
                id="answerInput"
                rows="10"
                placeholder='Answer:Type your answer.....'
                value={answer}
                onChange={handleAnswerChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mr-2" style={{textAlign:'center'}}>
              Add Answer
            </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" className="btn btn-secondary" onClick={() => history('/')}>
              Cancel
            </button>
          </form>
        </div>
    </div>
    </>
  );
};

export default AddAnswer;
