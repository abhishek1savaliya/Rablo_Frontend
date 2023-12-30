import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://rablo-backend-3rrt.onrender.com/auth/create', formData);

      if (response.data) {
        navigate("/login")
      }

    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-300 via-blue-400 to-indigo-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md border-2 py-4 px-10 shadow-lg rounded-md space-y-8 bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-purple-500">Sign up for an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="sr-only">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="First Name"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email address"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-between mt-4">
              <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};

export default SignupForm;
