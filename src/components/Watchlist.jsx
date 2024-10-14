import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import Card from './Card';
import MovieDetails from './Moviedetails';

const Watchlist = ({ watchList, handleRemoveFromWatchlist, handleAddWatchList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGenres, setActiveGenres] = useState(['All']);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const genreIdToName = (id) => {
    const genreMap = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Science Fiction',
      10770: 'TV Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western'
    };
    return genreMap[id] || 'Unknown';
  };

  const genres = useMemo(() => {
    const allGenres = new Set(watchList.flatMap(movie => 
      (movie.genre_ids || []).map(id => genreIdToName(id))
    ));
    return ['All', ...Array.from(allGenres)];
  }, [watchList]);

  const filteredWatchList = useMemo(() => {
    return watchList.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = activeGenres.includes('All') || 
        (movie.genre_ids || []).some(id => activeGenres.includes(genreIdToName(id)));
      return matchesSearch && matchesGenre;
    });
  }, [watchList, searchTerm, activeGenres]);

  const handleGenreClick = (genre) => {
    setActiveGenres(prev => {
      if (genre === 'All') {
        return ['All'];
      } else {
        const newGenres = prev.includes(genre)
          ? prev.filter(g => g !== genre)
          : [...prev.filter(g => g !== 'All'), genre];
        return newGenres.length ? newGenres : ['All'];
      }
    });
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">MY WATCHLIST</h1>
      
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full ${
              activeGenres.includes(genre)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            } hover:bg-blue-600 hover:text-white transition duration-300`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search your watchlist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {filteredWatchList.map(movie => (
          <Card
            key={movie.id}
            poster_path={movie.poster_path}
            movieName={movie.title}
            movie={movie}
            handleAddWatchList={handleAddWatchList}
            watchList={watchList}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {filteredWatchList.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No movies found in your watchlist.
        </p>
      )}

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isInWatchlist={watchList.some(m => m.id === selectedMovie.id)}
          onAddToWatchlist={handleAddWatchList}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
        />
      )}
    </div>
  );
};

export default Watchlist;
