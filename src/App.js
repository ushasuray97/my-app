import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddAnswer from './components/AddAnswer';
import AddQuestionPage from './components/AddQuestionPage';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Register from './components/Register';


function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [questions,setQuestions]=useState('');
  // check if user is logged in on initial load
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (storedProfile) {
      setUserProfile(storedProfile);
      setIsLoggedIn(true);
    }
  }, []);

  // update user profile in local storage when it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const handleLogin = (username, password) => {
    // check if username and password are valid
    // if so, set the user profile and logged in status
    const validUser = validateUser(username, password);
    if (validUser) {
      setUserProfile(validUser);
      setIsLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  function validateUser() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
    // Check if both username and password are stored in local storage
    if (!storedUsername || !storedPassword) {
      return false;
    }
  
    // Prompt user to enter their username and password
    const username = prompt('Please enter your username:');
    const password = prompt('Please enter your password:');
  
    // Check if the entered username and password match the stored values
    if (username === storedUsername && password === storedPassword) {
      return true;
    }
  
    return false;
  }
  

  function createNewUser(username, password,email) {
    // Get existing users from local storage or initialize to an empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if username already exists
    const existingUser = existingUsers.find(
      (user) => user.username === username
    );
  
    // If username already exists, return an error message
    if (existingUser) {
      return { success: false, message: "Username already exists" };
    }
  
    // If username does not exist, create a new user object and add it to the list
    const newUser = { username, password };
    existingUsers.push(newUser);
  
    // Save updated users list to local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));
  
    // Return success message
    return { success: true, message: "User created successfully" };
  }
  
  const handleLogout = () => {
    setUserProfile(null);
    setIsLoggedIn(false);
  };

  const handleRegistration = (username, password, email) => {
    // create a new user profile and set it as the current user
    const newProfile = createNewUser(username, password, email);
    setUserProfile(newProfile);
    setIsLoggedIn(true);
  };

  const handleAddAnswer = (newAnswer) => {
    const questionId = newAnswer.questionId;
    const questionIndex = questions.findIndex((q) => q.id === questionId);
  
    if (questionIndex !== -1) {
      const newQuestions = [...questions];
      const question = { ...newQuestions[questionIndex] };
      question.answers.push(newAnswer);
      newQuestions[questionIndex] = question;
      setQuestions(newQuestions);
      localStorage.setItem('questions', JSON.stringify(newQuestions));
      
    }
  };

  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/add-question" element={<AddQuestionPage userProfile={userProfile} questions={questions} setQuestions={setQuestions}/>} />
        <Route path="/add-answer/:id" element={<AddAnswer onAddAnswer={handleAddAnswer} questions={questions} setQuestions={setQuestions} />}/>
        <Route path="/add-answer" element={<AddAnswer userProfile={userProfile} questions={questions} setQuestions={setQuestions}/>} />
        <Route path="/login" element={<Login handleLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser}/>} />
        <Route path="/register" element={<Register handleRegistration={handleRegistration} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<MainPage userProfile={userProfile} isLoggedIn={isLoggedIn}/>} />
      </Routes>
    </Router>
  );
}

export default App;
