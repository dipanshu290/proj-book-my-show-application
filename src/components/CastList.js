function CastList({ cast }) {
  const fallbackImage = "https://via.placeholder.com/185x278?text=No+Image";

  return (
    <section className="mt-8" aria-label="Movie cast section">
      <h3 className="text-xl font-semibold text-bookmyshowRed mb-3 text-center">
        Cast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {cast.slice(0, 10).map(({ id, name, character, profile_path }) => (
          <div
            key={id}
            className="text-center"
            aria-label={`${name} as ${character}`}
          >
            <img
              loading="lazy"
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w185${profile_path}`
                  : fallbackImage
              }
              alt={name || "Unknown Actor"}
              className="rounded-lg w-full h-auto object-cover"
            />
            <p className="mt-2 font-medium text-bookmyshowDark">
              {name || "Unknown Actor"}
            </p>
            <p className="text-sm text-gray-500">
              {character || "Unknown Role"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CastList;
