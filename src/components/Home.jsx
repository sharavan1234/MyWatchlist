import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import Moviedetails from "./Moviedetails";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomArrow = ({ direction, onClick }) => (
  <button
    className={`absolute z-10 top-1/2 transform -translate-y-1/2 ${direction === 'prev' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-1 sm:p-2 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300`}
    onClick={onClick}
  >
    {direction === 'prev' ? <FaChevronLeft size={16} className="sm:w-6 sm:h-6" /> : <FaChevronRight size={16} className="sm:w-6 sm:h-6" />}
  </button>
);

const Home = ({ handleAddWatchList, handleRemoveFromWatchlist, watchList, searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [pgno, setpgno] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=8fc4ae4298b5268c016741a234a79e78&language=en-US`
      );
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchMovies = useCallback(async (page = 1, query = '') => {
    setIsSearching(!!query);
    try {
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=8fc4ae4298b5268c016741a234a79e78&query=${query}&page=${page}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=8fc4ae4298b5268c016741a234a79e78&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

      const moviesResponse = await axios.get(endpoint);
      setMovies(moviesResponse.data.results);

      if (!query) {
        const popularResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=8fc4ae4298b5268c016741a234a79e78&language=en-US&page=1`
        );
        setPopularMovies(popularResponse.data.results.slice(0, 10));
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, []);

  useEffect(() => {
    fetchMovies(pgno, searchQuery);
  }, [pgno, searchQuery, fetchMovies]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCarouselClick = (movie) => {
    fetchMovieDetails(movie.id);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">Welcome to MY WATCHLIST</h1>
      {!isSearching && (
        <div className="mb-8 relative">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Popular Movies</h2>
          <Slider {...sliderSettings}>
            {popularMovies.map((movie) => (
              <div key={movie.id} className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] cursor-pointer" onClick={() => handleCarouselClick(movie)}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{movie.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg line-clamp-2 sm:line-clamp-3">{movie.overview}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        {isSearching ? `Search Results for "${searchQuery}"` : "All Movies"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            poster_path={movie.poster_path}
            watchList={watchList}
            movieName={movie.original_title}
            movie={movie}
            handleAddWatchList={handleAddWatchList}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      {!isSearching && (
        <div className="m-2 flex justify-center gap-2 mt-8">
          <button
            onClick={() => {
              if (pgno >= 2) {
                setpgno(pgno - 1);
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded text-sm sm:text-base"
            disabled={pgno === 1}
          >
            ←
          </button>
          <span className="p-2 font-bold">{pgno}</span>
          <button
            onClick={() => setpgno(pgno + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded text-sm sm:text-base"
          >
            →
          </button>
        </div>
      )}

      {selectedMovie && (
        <Moviedetails
          movie={selectedMovie}
          onClose={handleCloseDetails}
          isInWatchlist={watchList.some((m) => m.id === selectedMovie.id)}
          onAddToWatchlist={handleAddWatchList}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
        />
      )}
    </div>
  );
};

export default Home;
