import { fetchFromOMDB } from "../utils/fetchFromTMDB.js";
import { Movie } from "../models/movie.model.js";

// Fetch and store movies from OMDb API
// export const fetchAndStoreMovies = async () => {
//     console.log("Fetching movies from OMDb...");
//     const movieTitles = ["Inception", "The Dark Knight", "Interstellar", "The Matrix", "Titanic", "Avatar", "The Avengers", "The Godfather", "Pulp Fiction", "Forrest Gump"];

//     // const data = await fetchFromOMDB("Inception"); // Example for a single movie, modify for bulk fetching if needed

//     // console.log(data);
    
//     // Ensure we have the required data
//     // if (!data || !data.success || data.data.length === 0) {
//     //     return console.error("No movie data found!");
//     // }

//     for (const title of movieTitles) {
//         try {
//             const data = await fetchFromOMDB(title); 
//             console.log(data);
            
//             // Fetch data for each movie
//             if (!data || !data.success || !data.data) {
//                 console.log(`No data found for ${title}`);
//                 continue;
//             }

//             const movie = data.data[0]; // Assuming each response returns an array with a single movie result
            
//             // Check if the movie already exists in the database by IMDb ID
//             const existingMovie = await Movie.findOne({ imdbId: movie.imdbID });

//             if (!existingMovie) {
//                 // Save the movie data to MongoDB
//                 await Movie.create({
//                     imdbId: movie.imdbID,
//                     title: movie.Title,
//                     year: movie.Year,
//                     rated: movie.Rated,
//                     released: movie.Released,
//                     runtime: movie.Runtime,
//                     genre: movie.Genre,
//                     director: movie.Director,
//                     writer: movie.Writer,
//                     actors: movie.Actors,
//                     plot: movie.Plot,
//                     language: movie.Language,
//                     country: movie.Country,
//                     awards: movie.Awards,
//                     poster: movie.Poster,
//                     metascore: movie.Metascore,
//                     imdbRating: movie.imdbRating,
//                     imdbVotes: movie.imdbVotes,
//                     boxOffice: movie.BoxOffice,
//                     website: movie.Website,
//                 });
//                 console.log(`✅ Added: ${movie.Title}`);
//             } else {
//                 console.log(`⚠️ Skipped (Already Exists): ${movie.Title}`);
//             }
//         } catch (error) {
//             console.error(`Error fetching or saving ${title}:`, error.message);
//         }
//     }
// };


// export const fetchAndStoreMovies = async () => {
//     console.log("Fetching movies from OMDb...");
//     const movieTitles = [
//         "Inception", "The Dark Knight", "Interstellar", "The Matrix", 
//         "Titanic", "Avatar", "The Avengers", "The Godfather", 
//         "Pulp Fiction", "Forrest Gump"
//     ];

//     try {
//         const data = await fetchFromOMDB(movieTitles); // Pass the array of movie titles

//         if (!data || data.length === 0) {
//             return console.error("No movie data found!");
//         }

//         // Loop through the results and handle them
//         for (const movie of data) {
//             try {
//                 if (!movie || !movie.imdbID) {
//                     console.log(`No data for ${movie.Title}`);
//                     continue; // Continue if no imdbID is found
//                 }

//                 const uniqueId = movie.tmdbId || movie.imdbID;
//                 if (!uniqueId) {
//                     console.log(`Skipping ${movie.Title} due to missing unique identifier`);
//                     continue; // Skip if no unique identifier (tmdbId or imdbID) is available
//                 }

//                 // Check if the movie already exists in the database by IMDb ID
//                 const existingMovie = await Movie.findOne({ imdbId: uniqueId });

//                 if (!existingMovie) {
//                     // Save the movie data to MongoDB
//                     await Movie.create({
//                         tmdbId: movie.tmdbId || null,
//                         imdbId: movie.imdbID,
//                         title: movie.Title,
//                         year: movie.Year,
//                         rated: movie.Rated,
//                         released: movie.Released,
//                         runtime: movie.Runtime,
//                         genre: movie.Genre,
//                         director: movie.Director,
//                         writer: movie.Writer,
//                         actors: movie.Actors,
//                         plot: movie.Plot,
//                         language: movie.Language,
//                         country: movie.Country,
//                         awards: movie.Awards,
//                         poster: movie.Poster,
//                         metascore: movie.Metascore,
//                         imdbRating: movie.imdbRating,
//                         imdbVotes: movie.imdbVotes,
//                         boxOffice: movie.BoxOffice,
//                         website: movie.Website,
//                     });
//                     console.log(`✅ Added: ${movie.Title}`);
//                 } else {
//                     console.log(`⚠️ Skipped (Already Exists): ${movie.Title}`);
//                 }
//             } catch (error) {
//                 console.error(`Error fetching or saving ${movie.Title}:`, error.message);
//                 continue; // Continue with the next movie in case of error
//             }
//         }
//     } catch (error) {
//         console.error("Error fetching from OMDb:", error.message);
//     }
// };



export const fetchAndStoreMovies = async () => {
    console.log("Fetching movies from OMDb...");
    const movieTitles = [
        "Inception", "The Dark Knight", "Interstellar", "The Matrix", 
        "Titanic", "Avatar", "The Avengers", "The Godfather", 
        "Pulp Fiction", "Forrest Gump"
    ];

    try {
        const data = await fetchFromOMDB(movieTitles); // Pass the array of movie titles

        if (!data || data.length === 0) {
            return console.error("No movie data found!");
        }

        // Loop through the results and handle them
        for (const movie of data) {
            try {
                if (!movie || !movie.imdbID) {
                    console.log(`No data for ${movie.Title}`);
                    continue;
                }

                // Use imdbID as the unique identifier
                const uniqueId = movie.imdbID;

                // Use upsert to insert or update the movie by imdbID
                await Movie.updateOne(
                    { imdbId: uniqueId }, // Check by imdbId
                    {
                        $set: {
                            tmdbId: movie.tmdbId || null, // Set tmdbId to null if it doesn't exist
                            imdbId: movie.imdbID,
                            title: movie.Title,
                            year: movie.Year,
                            rated: movie.Rated,
                            released: movie.Released,
                            runtime: movie.Runtime,
                            genre: movie.Genre,
                            director: movie.Director,
                            writer: movie.Writer,
                            actors: movie.Actors,
                            plot: movie.Plot,
                            language: movie.Language,
                            country: movie.Country,
                            awards: movie.Awards,
                            poster: movie.Poster,
                            metascore: movie.Metascore,
                            imdbRating: movie.imdbRating,
                            imdbVotes: movie.imdbVotes,
                            boxOffice: movie.BoxOffice,
                            website: movie.Website,
                        }
                    },
                    { upsert: true } // Set upsert to true
                );
                console.log(`✅ Added or Updated: ${movie.Title}`);
            } catch (error) {
                console.error(`Error fetching or saving ${movie.Title}:`, error.message);
            }
        }
    } catch (error) {
        console.error("Error fetching from OMDb:", error.message);
    }
};