import { fetchFromTMDB } from "../utils/fetchFromTMDB.js";
import { Movie } from "../models/movie.model.js";

// Fetch and store popular movies
export const fetchAndStoreMovies = async () => {
    console.log("Fetching movies from TMDB...");
    
    const data = await fetchFromTMDB("movie/popular");

    if (!data || !data.results) return console.error("No movies found!");

    for (const movie of data.results) {
        try {
            // Check if the movie already exists in the database
            const existingMovie = await Movie.findOne({ tmdbId: movie.id });

            if (!existingMovie) {
                await Movie.create({
                    tmdbId: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    posterPath: movie.poster_path,
                    backdropPath: movie.backdrop_path,
                    releaseDate: movie.release_date,
                    genres: movie.genre_ids, // Store genre IDs (optional)
                    rating: movie.vote_average
                });
                console.log(`✅ Added: ${movie.title}`);
            } else {
                console.log(`⚠️ Skipped (Already Exists): ${movie.title}`);
            }
        } catch (error) {
            console.error(`Error saving ${movie.title}:`, error.message);
        }
    }
};
