import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { fetchFromOMDB } from "./utils/fetchFromTMDB.js";
const app=express()
import dotenv from "dotenv";
dotenv.config();  // This will load the .env file into process.env





app.use(cors({
    origin: "http://localhost:5173",
     methods: "GET,POST,PUT,DELETE",
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
// console.log(process.env.TMDB_API_KEY);

 import userRouter from './routes/user.routes.js'
 import movieRouter from "./routes/movie.routes.js";
import { fetchAndStoreMovies } from "./services/movieService.js";


//for TMDB
//  app.get("/debug/tmdb", async (req, res) => {
//     try {
//         const data = await fetchFromOMDB("movie/popular");
//         if (data && data.results) {
//             res.status(200).json({
//                 success: true,
//                 message: "Successfully fetched data from TMDB",
//                 data: data.results, // You can return any part of the TMDB response you need
//             });
//         } else {
//             res.status(500).json({
//                 success: false,
//                 message: "No data found or error fetching from TMDB",
//             });
//         }
//     } catch (error) {
//         console.error("Error fetching from TMDB:", error.message);
//         res.status(500).json({
//             success: false,
//             message: "Error fetching from TMDB",
//             error: error.message,
//         });
//     }
// });



// //routes declaration

//for OMDB
app.get("/api/v1/movies/omdb", async (req, res) => {
    try {

        // await fetchAndStoreMovies();
        const movieTitles = [
            "Inception", "The Matrix", "The Dark Knight", "Interstellar", 
            "The Godfather", "Pulp Fiction", "The Shawshank Redemption", 
            "Forrest Gump", "The Lion King", "Fight Club"
        ];
        
        const movieData = await fetchFromOMDB(movieTitles);

        res.status(200).json({
            success: true,
            message: "Fetched top 10 movies successfully from OMDb",
            data: movieData, // Array of 10 movie objects
        });
    } catch (error) {
        console.error("Error fetching movies from OMDb:", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching movies from OMDb",
            error: error.message,
        });
    }
});

app.get('/fetch-movies', async (req, res) => {
    try {
        await fetchAndStoreMovies();  // Fetch and store movies from OMDb
        res.status(200).json({ message: "Movies fetched and stored successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error fetching and storing movies.", error: error.message });
    }
});
app.use("/api/v1/users",userRouter)
app.use("/api/v1/movies", movieRouter);

export {app}