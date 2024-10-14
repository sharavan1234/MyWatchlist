import axios from 'axios';

const API_KEY = '8fc4ae4298b5268c016741a234a79e78'; // Your TMDB API key

const getDirectStreamingLink = (provider, movieTitle) => {
  const encodedTitle = encodeURIComponent(movieTitle);
  switch (provider.toLowerCase()) {
    case 'netflix':
      return `https://www.netflix.com/search?q=${encodedTitle}`;
    case 'amazon prime video':
      return `https://www.amazon.com/s?k=${encodedTitle}&i=instant-video`;
    case 'disney plus':
      return `https://www.disneyplus.com/search?q=${encodedTitle}`;
    case 'hulu':
      return `https://www.hulu.com/search?q=${encodedTitle}`;
    case 'apple tv':
      return `https://tv.apple.com/search?term=${encodedTitle}`;
    default:
      return null;
  }
};

export const getStreamingAvailability = async (movieId, movieTitle) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`
    );
    
    // We'll use US providers, but you can change this or make it dynamic
    const providers = response.data.results.US;
    
    if (providers && providers.flatrate) {
      // Get the first streaming option
      const streamingService = providers.flatrate[0];
      const directLink = getDirectStreamingLink(streamingService.provider_name, movieTitle);
      
      return {
        service: streamingService.provider_name,
        logo: `https://image.tmdb.org/t/p/original${streamingService.logo_path}`,
        link: directLink || providers.link // Fallback to TMDB link if we can't generate a direct link
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching streaming availability:", error);
    return null;
  }
};
