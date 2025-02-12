import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    tmdbId: { type: Number, required: true, unique: true }, // TMDB movie ID
    title: { type: String, required: true },
    overview: { type: String },
    posterPath: { type: String },
    backdropPath: { type: String },
    releaseDate: { type: String },
    genres: [{ type: String }],
    rating: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

export const Movie = mongoose.model("Movie", movieSchema);
