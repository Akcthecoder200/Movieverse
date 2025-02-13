import { Movie } from "../models/movie.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all movies
export const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({});
    
    res.status(200).json(movies);
});

// Get a specific movie by ID
export const getMovieById = asyncHandler(async (req, res) => {
    const movie = await Movie.findOne({ tmdbId: req.params.id });

    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
});
