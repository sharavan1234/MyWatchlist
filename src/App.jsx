import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import Home from "./components/Home.jsx";
import Watchlist from "./components/Watchlist.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [watchList, setWatchList] = useState(() => {
    // Initialize watchList from localStorage or empty array if not found
    const savedWatchList = localStorage.getItem("watchList");
    return savedWatchList ? JSON.parse(savedWatchList) : [];
  });
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Save watchList to localStorage whenever it changes
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    // Apply dark mode class to html element
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleAddWatchList = (movie) => {
    setWatchList((prevList) => {
      if (!prevList.some((m) => m.id === movie.id)) {
        return [...prevList, movie];
      }
      return prevList;
    });
  };

  const handleRemoveFromWatchlist = (movie) => {
    setWatchList((prevList) => prevList.filter((m) => m.id !== movie.id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onSearch={handleSearch}
          />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    watchList={watchList}
                    handleAddWatchList={handleAddWatchList}
                    handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                    searchQuery={searchQuery}
                  />
                }
              />
              <Route
                path="/watchlist"
                element={
                  <Watchlist
                    watchList={watchList}
                    handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                    handleAddWatchList={handleAddWatchList}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
