import { useEffect, useState } from "react";
import {
  fetchPopularMovies,
  searchMovies,
  fetchMoviesByGenre,
} from "../services/MovieService";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 10749, name: "Romance" },
    { id: 27, name: "Horror" },
  ];

  const genreMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

  const getGenreNames = (ids) =>
    ids
      ?.map((id) => genreMap[id])
      .filter(Boolean)
      .join(", ") || "Unknown";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = selectedGenre
        ? await fetchMoviesByGenre(selectedGenre, page)
        : await fetchPopularMovies(page);
      setMovies(data);
      setLoading(false);
    };
    fetchData();
  }, [selectedGenre, page]);

  const handleSearch = async () => {
    setLoading(true);
    setSelectedGenre(null);
    setPage(1);
    const data = query.trim()
      ? await searchMovies(query)
      : await fetchPopularMovies(1);
    setMovies(data);
    setLoading(false);
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setQuery("");
    setPage(1);
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold text-bookmyshowDark mb-6">
        Now Showing 🎞️
      </h1>

      <section className="flex justify-center items-center mb-6 gap-3">
        <input
          type="text"
          placeholder="Search movie by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-96 border border-bookmyshowLight px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-bookmyshowRed"
        />
        <button
          onClick={handleSearch}
          className="bg-bookmyshowRed text-white font-semibold px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Search
        </button>
      </section>

      <nav className="flex flex-wrap justify-center gap-3 mb-6">
        {genres.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => handleGenreClick(id)}
            className={`px-4 py-2 rounded ${
              selectedGenre === id
                ? "bg-bookmyshowRed text-white"
                : "bg-bookmyshowLight text-bookmyshowDark hover:bg-bookmyshowRed hover:text-white"
            } transition`}
          >
            {name}
          </button>
        ))}
      </nav>

      {loading ? (
        <p className="text-center text-gray-500">Loading movies...</p>
      ) : movies.length === 0 ? (
        <p className="text-center text-bookmyshowDark mt-10">
          No results found ❌
        </p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              genre={getGenreNames(movie.genre_ids)}
              rating={movie.vote_average}
            />
          ))}
        </section>
      )}

      {!loading && movies.length > 0 && (
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 border rounded bg-bookmyshowLight hover:bg-bookmyshowRed hover:text-white transition"
          >
            ← Prev
          </button>
          <span className="text-bookmyshowDark font-medium">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded bg-bookmyshowLight hover:bg-bookmyshowRed hover:text-white transition"
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}

export default Movies;
