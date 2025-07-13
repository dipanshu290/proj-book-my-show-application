import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById, fetchMovieCredits } from "../services/MovieService";
import CastList from "../components/CastList";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovieById(id);
      const credits = await fetchMovieCredits(id);
      setMovie(data);
      setCast(credits);
    };
    fetchData();
  }, [id]);

  if (!movie) {
    return (
      <div className="text-center mt-20 text-bookmyshowDark text-lg font-medium">
        Loading movie details...
      </div>
    );
  }

  const {
    title,
    poster_path,
    overview,
    genres,
    runtime,
    release_date,
    vote_average,
  } = movie;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={title}
          className="rounded-lg shadow-md w-full md:w-1/3"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-bookmyshowDark mb-2">
            {title}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Released on: {release_date}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-bookmyshowLight text-bookmyshowDark px-2 py-1 rounded text-sm font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-bookmyshowDark font-medium mb-2">
            Runtime: {runtime} mins
          </p>
          <p className="text-yellow-500 font-semibold mb-4">
            ⭐ {vote_average}/10
          </p>

          <h2 className="text-lg font-semibold text-bookmyshowRed mb-2">
            Overview
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{overview}</p>

          <button
            className="bg-bookmyshowRed text-white font-semibold px-6 py-3 rounded hover:bg-red-700 transition"
            onClick={() => navigate(`/booking/${id}`)}
          >
            Book Now
          </button>
        </div>
      </div>

      <CastList cast={cast} />
    </div>
  );
}

export default Details;
