import React, { useState } from "react";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const searchMovies = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setErrorMsg("");
    setMovies([]);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${encodeURIComponent(
          trimmed
        )}`
      );

      if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !Array.isArray(data.results)) {
        throw new Error("Unexpected API response format.");
      }

      setMovies(data.results);
    } catch (err) {
      setErrorMsg(
        "Something went wrong while searching. Please try again in a moment."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") searchMovies();
  };

  return (
    <div>
      <h2>Search Movies</h2>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />

      <button onClick={searchMovies} disabled={loading || !query.trim()}>
        {loading ? "Searching..." : "Search"}
      </button>

      {errorMsg && (
        <p style={{ marginTop: "12px" }}>
          <strong>{errorMsg}</strong>
        </p>
      )}

      {!loading && !errorMsg && movies.length === 0 && query.trim() && (
        <p style={{ marginTop: "12px" }}>No results found.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "12px" }}>
        {movies.map((movie) => (
          <li
            key={movie.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100px" }}
              />
            ) : (
              <div
                style={{
                  width: "100px",
                  height: "150px",
                  backgroundColor: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "#555",
                }}
              >
                No Image
              </div>
            )}

            <div>
              <strong>{movie.title}</strong>
              <p>{movie.release_date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;