import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true)

    try {
      const response = await axios.post('https://rablo-backend-3rrt.onrender.com/auth/user', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setTimeout(() => {
        setLoader(false)
        navigate("/")
      }, 1000)
    } catch (error) {
      setTimeout(() => {
        setLoader(false)
        navigate("/signup")
      }, 1000)
      alert("User Not found. Please Signup the user")
      
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
        <p className="text-sm text-gray-600 text-red-800">
          **Sometimes it may take longer due to free server limitations.
        </p>
        <h2 className="text-3xl font-bold mb-6 text-center text-green-500">Login</h2>


        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          {
            loader ? (<div role="status">
              <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>) : (<button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Login
            </button>
            )
          }
          <div className="flex items-center justify-between">
            <Link to="/signup" className="text-pink-500 hover:underline ml-2">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>

  );
};

export default LoginForm;
