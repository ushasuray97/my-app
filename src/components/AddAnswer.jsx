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
      const question = questions.find((q) => q.id === parseInt(selectedQuestion, 10));
      console.log(question);
      if (question) {
        console.log("getting question");
        const newAnswer = {
          id: Date.now(),
          questionId: question.id,
          answer: answer,
          username: localStorage.getItem('username'),
        };
  
        // Add the new answer to the question's answers array
        const updatedQuestions = questions.map((q) => {
          if (q.id === question.id) {
            return {
              ...q,
              answers: [...q.answers, newAnswer],
            };
          }
          return q;
        });
  
        // Update the questions state with the new array of questions
        setQuestions(updatedQuestions);
  
        // Find the updated question in the updatedQuestions array
        const updatedQuestion = updatedQuestions.find((q) => q.id === question.id);
  
        // Update the question state with the updated question object
        setQuestion(updatedQuestion);
  
        // Clear the answer input
        setAnswer('');
  
        // Navigate to the question page
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
          <h1>Add Answer</h1>

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
              <label htmlFor="answerInput">Answer:</label>
              <textarea
                className="form-control"
                id="answerInput"
                rows="3"
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
