import axios from "axios";

// const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY  ;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";


// `${TMDB_BASE_URL}/${endpoint}`
//`${process.env.TMDB_API_KEY}`
// export const fetchFromTMDB = async (endpoint, params = {}) => {
//     try {
//         console.log("Fetching from TMDB:", endpoint);
//         console.log("Using API Key:", TMDB_API_KEY); 
//         const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
//             params: { api_key:'33babcc6d29a31f66d87966e7fa4f0c4', ...params }
//         });
        
//         return response.data;
//     } catch (error) {
//         console.error("TMDB API Error:", error.response?.data || error.message);
//         return null;
//     }
    
    
// };
// export const fetchFromTMDB = async (endpoint, params = {}) => {
//     try {
//         const TMDB_API_KEY = process.env.TMDB_API_KEY; // Access the API key from environment variables
//         if (!TMDB_API_KEY) {
//             throw new Error("TMDB_API_KEY is not defined in the environment variables.");
//         }

//         console.log("Fetching from TMDB:", endpoint);
//         console.log("Using API Key:", TMDB_API_KEY); 
//         const response = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, {
//             params: { api_key: TMDB_API_KEY, ...params }
//         });
        
//         return response.data;
//     } catch (error) {
//         console.error("TMDB API Error:", error.response?.data || error.message);
//         return null;
//     }
// };



const OMDB_API_KEY ='966c4f4f';  // Replace with your OMDB API key
const OMDB_BASE_URL = "http://www.omdbapi.com/";

export const fetchFromOMDB = async (titles) => {
    const promises = titles.map(async (title) => {
        const response = await axios.get(OMDB_BASE_URL, {
            params: {
                apikey: OMDB_API_KEY,
                t: title,  // Movie title
            }
        });
        return response.data;
    });

    return Promise.all(promises);
};