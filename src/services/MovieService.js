const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const data = await response.json();
    return data.results || [];
  } catch {
    return [];
  }
}

export async function fetchMovieById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}

export async function searchMovies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&language=en-US`
    );
    const data = await response.json();
    return data.results || [];
  } catch {
    return [];
  }
}

export async function fetchMovieCredits(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.cast || [];
  } catch {
    return [];
  }
}

export async function fetchMoviesByGenre(genreId, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    );
    const data = await response.json();
    return data.results || [];
  } catch {
    return [];
  }
}
