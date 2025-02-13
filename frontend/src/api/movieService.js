import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1/movies"; // Backend API

export const getMovies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`); // Assuming you have an `/all` endpoint
        // console.log(response.data);
        return response.data; 
       
        // Returning only movie data
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};
