import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="px-4 py-2 border border-bookmyshowLight rounded-l-lg w-72 focus:outline-none focus:ring-2 focus:ring-bookmyshowRed transition"
      />
      <button
        type="submit"
        className="bg-bookmyshowRed text-white px-5 py-2 rounded-r-lg font-semibold hover:bg-red-700 transition duration-200 ease-in-out"
      >
        Search 🔍
      </button>
    </form>
  );
}

export default SearchBar;
