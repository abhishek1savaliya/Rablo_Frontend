// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login")
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4">
      <nav className="container mx-auto flex items-center justify-between">
        {token && (
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-2xl hover:text-blue-200 transition duration-300">
              Home
            </Link>
          </div>
        )}
        <div className="flex items-center space-x-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 py-2 px-4 rounded-full hover:bg-blue-600 hover:text-white shadow-md transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="text-white border-2 border-white py-2 px-4 rounded-full hover:bg-white hover:text-blue-600 shadow-md transition duration-300"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-white border-2 border-white py-2 px-4 rounded-full hover:bg-white hover:text-blue-600 shadow-md transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
