import React, { useEffect } from 'react';
import { FaStar, FaPlus, FaMinus, FaTimes } from 'react-icons/fa';

const MovieDetails = ({ movie, onClose, isInWatchlist, onAddToWatchlist, onRemoveFromWatchlist }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const genreIdToName = (id) => {
    const genreMap = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
      99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
      10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };
    return genreMap[id] || 'Unknown';
  };

  const genres = (movie.genre_ids || []).map(id => genreIdToName(id)).join(', ');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col md:flex-row">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{movie.overview}</p>
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{movie.vote_average.toFixed(1)} ({movie.vote_count} votes)</span>
            </div>
            <p className="mb-2">Release Date: {movie.release_date}</p>
            <p className="mb-2">Genres: {genres}</p>
            <p className="mb-4">Popularity: {movie.popularity.toFixed(2)}</p>
            <button
              onClick={() => isInWatchlist ? onRemoveFromWatchlist(movie) : onAddToWatchlist(movie)}
              className={`flex items-center ${
                isInWatchlist ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold py-2 px-4 rounded transition duration-300`}
            >
              {isInWatchlist ? (
                <>
                  <FaMinus className="mr-2" /> Remove from Watchlist
                </>
              ) : (
                <>
                  <FaPlus className="mr-2" /> Add to Watchlist
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
