import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MyWatchlist</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/watchlist" className="hover:text-gray-300">Watchlist</Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-300" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
