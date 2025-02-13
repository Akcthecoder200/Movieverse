import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    imdbId: { type: String, required: true, unique: true },
    tmdbId: { type: String, unique: false },
    title: String,
    year: String,
    rated: String,
    released: String,
    runtime: String,
    genre: String,
    director: String,
    writer: String,
    actors: String,
    plot: String,
    language: String,
    country: String,
    awards: String,
    poster: String,
    metascore: String,
    imdbRating: String,
    imdbVotes: String,
    boxOffice: String,
    website: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);
