import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Watchlist from "./components/Watchlist.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [darkMode, setDarkMode] = useState(true); // Set default to true
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    // Apply dark mode class to HTML element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAddWatchList = (movie) => {
    setWatchList((prevList) => [...prevList, movie]);
  };

  const handleRemoveFromWatchlist = (movie) => {
    setWatchList((prevList) => prevList.filter((m) => m.id !== movie.id));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                handleAddWatchList={handleAddWatchList}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                watchList={watchList}
              />
            } 
          />
          <Route 
            path="/watchlist" 
            element={
              <Watchlist 
                watchList={watchList}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
