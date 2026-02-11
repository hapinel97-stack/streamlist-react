import React, { useState } from "react";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (!query) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
    );

    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <div>
      <h2>Search Movies</h2>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchMovies}>Search</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {movies.map((movie) => (
          <li
            key={movie.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
              border: "1px solid #ccc",
              padding: "10px"
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
                  color: "#555"
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