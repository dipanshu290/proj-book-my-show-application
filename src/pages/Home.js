import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/MovieService";
import { Link } from "react-router-dom";

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function getFeatured() {
      const movies = await fetchPopularMovies();
      setFeatured(movies.slice(0, 5));
    }
    getFeatured();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-bookmyshowDark mb-6 text-center">
        🎬 Welcome to CineZone!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {featured.map((movie) => (
          <Link
            key={movie.id}
            to={`/details/${movie.id}`}
            className="block hover:scale-105 transition"
          >
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                  : "https://via.placeholder.com/780x439?text=No+Banner"
              }
              alt={movie.title}
              className="rounded-lg shadow-md"
            />
            <h2 className="mt-2 text-lg font-semibold text-bookmyshowDark text-center">
              {movie.title}
            </h2>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        {["Action", "Drama", "Comedy", "Thriller"].map((genre) => (
          <button
            key={genre}
            className="bg-bookmyshowLight text-bookmyshowDark px-4 py-2 rounded hover:bg-bookmyshowRed hover:text-white transition"
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
