import React from 'react'
import { FaPlus, FaMinus, FaStar } from 'react-icons/fa';

const Card = ({ poster_path, movieName, movie, handleAddWatchList, watchList, handleRemoveFromWatchlist, onCardClick }) => {
  const isInWatchlist = watchList && watchList.some(m => m.id === movie.id);

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

  const genres = (movie.genre_ids || []).map(id => genreIdToName(id)).join(', ');

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={movieName}
        className="w-full h-auto object-cover aspect-[2/3]"
        onClick={() => onCardClick(movie)}
      />
      <div className="p-2">
        <h3 className="text-xs sm:text-sm font-semibold mb-1 truncate">{movieName}</h3>
        <button
          onClick={() => isInWatchlist ? handleRemoveFromWatchlist(movie) : handleAddWatchList(movie)}
          className={`mt-2 px-2 py-1 text-xs rounded ${
            isInWatchlist ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default Card
