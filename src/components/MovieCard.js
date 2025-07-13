import { NavLink } from "react-router-dom";

function MovieCard({ id, title, poster, genre, rating }) {
  const fallbackPoster = "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <article
      role="listitem"
      aria-label={`Movie card for ${title || "Unknown Movie"}`}
      className="bg-white border border-bookmyshowLight rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out overflow-hidden"
    >
      <NavLink
        to={`/booking/${id}`}
        state={{ movieTitle: title }}
        aria-label={`Book tickets for ${title || "Unknown Movie"}`}
        className="block focus:outline-none focus:ring-2 focus:ring-bookmyshowRed"
      >
        <img
          loading="lazy"
          src={poster || fallbackPoster}
          alt={`${title || "Movie"} poster`}
          className="w-full h-64 object-cover rounded-t-md"
        />

        <div className="p-4">
          <h3
            className="text-xl font-bold text-bookmyshowDark mb-2"
            aria-label={`Title: ${title || "N/A"}`}
          >
            {title || "Untitled"}
          </h3>

          {genre ? (
            <span
              className="inline-block bg-bookmyshowLight text-bookmyshowDark px-2 py-1 rounded text-sm font-medium mb-2"
              aria-label={`Genre: ${genre}`}
            >
              {genre}
            </span>
          ) : (
            <span className="text-xs text-gray-400 mb-2">Genre: Unknown</span>
          )}

          <p
            className="text-sm font-medium text-yellow-500"
            aria-label={`Rating: ${rating ? rating : "Unrated"} out of 10`}
          >
            ⭐ {rating ? `${rating}/10` : "Unrated"}
          </p>
        </div>
      </NavLink>
    </article>
  );
}

export default MovieCard;
