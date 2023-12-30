// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }

  return (
    <div className="bg-blue-500 p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white font-bold text-xl">
            Home
          </Link>
        </div>
        <div className="flex items-center">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-500 py-1 px-3 rounded-full hover:bg-blue-500 hover:text-white border border-blue-500 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="text-white mr-4 border border-white py-1 px-3 rounded-full hover:bg-white hover:text-blue-500 transition duration-300"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-white border border-white py-1 px-3 rounded-full hover:bg-white hover:text-blue-500 transition duration-300"
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
