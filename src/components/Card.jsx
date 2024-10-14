import React from 'react'
import { FaPlus, FaMinus, FaStar } from 'react-icons/fa';

const Card = ({ poster_path, movieName, movie, handleAddWatchList, watchList, handleRemoveFromWatchlist, onCardClick }) => {
  const isInWatchlist = watchList.some((m) => m.id === movie.id);

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
    <div className="relative group cursor-pointer" onClick={() => onCardClick(movie)}>
      <div
        className="h-[45vh] w-[200px] bg-cover bg-center rounded-2xl shadow-lg overflow-hidden transform transition duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              isInWatchlist ? handleRemoveFromWatchlist(movie) : handleAddWatchList(movie);
            }}
            className="self-end bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 transition duration-300"
          >
            {isInWatchlist ? <FaMinus /> : <FaPlus />}
          </button>
          <div>
            <h3 className="text-white text-center font-semibold mb-2">{movieName}</h3>
            <p className="text-gray-300 text-sm text-center mb-2">{genres}</p>
            <div className="flex items-center justify-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-white">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card

