import { useEffect, useState } from "react";
import { getMovies } from "../api/movieService";
import MovieCard from "../components/MovieCard/MovieCard.jsx";

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies();
            setMovies(data);
           console.log(movies);
           
        };
        fetchMovies();
    }, []);

     

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Home;
