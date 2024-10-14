import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaSearch } from 'react-icons/fa';

const Navbar = ({ darkMode, toggleDarkMode, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    onSearch(''); // Clear the search query
    setSearchQuery(''); // Clear the input field
    navigate('/');
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={handleHomeClick} className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">MyWatchlist</span>
          </Link>
          <div className="flex-1 mx-10">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-full bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={handleHomeClick} className="hover:text-blue-500 transition duration-300">Home</button>
            <Link to="/watchlist" className="hover:text-blue-500 transition duration-300">Watchlist</Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
