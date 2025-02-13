import React from "react";

const MovieCard = ({ movie }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105">
            {/* Movie Poster */}
            <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-full h-64 object-cover"
            />

            {/* Movie Info */}
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{movie.title} ({movie.year})</h2>
                <p className="text-sm text-gray-600">{movie.genre}</p>

                {/* Ratings & Runtime */}
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-700">
                        ⏳ {movie.runtime} | 🎬 {movie.director}
                    </span>
                    <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                        ⭐ {movie.imdbRating}
                    </span>
                </div>

                {/* Plot */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {movie.plot}
                </p>

                {/* Additional Details */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">📅 {movie.released}</span>
                    <span className="text-xs text-gray-500">🌎 {movie.country}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
