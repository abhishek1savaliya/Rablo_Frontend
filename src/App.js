
import './App.css';
import LoginPage from './components/LoginForm';
import Signup from './components/SignupForm';

// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (you should replace this with actual authentication logic)
    // For simplicity, we use a mock check here
    const userIsLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(userIsLoggedIn);
  }, []);

  const handleLogin = () => {
    // Replace this with actual authentication logic
    localStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Replace this with actual logout logic
    localStorage.setItem('loggedIn', 'false');
    setLoggedIn(false);
  };


  return (

    <BrowserRouter>
      <div>
        <Navbar loggedIn={loggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />

        <Routes>

          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

          <Route path="/signup"element={<SignupForm />} />
            
          <Route path="/" exact element={<ProductList />} />
            
          <Route path="/add" exact element={<AddProduct />} />
            
        </Routes>
        
      </div>
    </BrowserRouter>

  );
};

export default App;
