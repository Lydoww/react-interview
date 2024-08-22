import React, { useEffect, useState } from "react";
import { movies$ } from "../data/movies";
import MovieCard from "./MovieCard";

const getUniqueCategories = (movies) => {
  const categories = movies.map((movie) => movie.category);
  return [...new Set(categories)];
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    movies$.then((data) => {
      setMovies(data);
      setFilteredMovies(data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter((movie) => movie.category === selectedCategory)
      );
    }
    setCurrentPage(1);
  }, [selectedCategory, movies]);

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const handleReact = (id, type, add) => {
    setMovies(
      movies.map((movie) => {
        if (movie.id === id) {
          return {
            ...movie,
            likes: type === "like" ? movie.likes + (add ? 1 : -1) : movie.likes,
            dislikes:
              type === "dislike"
                ? movie.dislikes + (add ? 1 : -1)
                : movie.dislikes,
          };
        }
        return movie;
      })
    );
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const categories = getUniqueCategories(movies);

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  return (
    <div>
      <div className="filter">
        <fieldset>
          {categories.map((category) => (
            <div key={category} className="filter-option">
              <input
                type="radio"
                id={category}
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={handleCategoryChange}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
          <div className="filter-option">
            <input
              type="radio"
              id="all"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={handleCategoryChange}
            />
            <label htmlFor="all">All</label>
          </div>
        </fieldset>
      </div>
      <div className="movie-list">
        {currentMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            category={movie.category}
            likes={movie.likes}
            dislikes={movie.dislikes}
            onDelete={() => handleDelete(movie.id)}
            onReact={handleReact}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>
      </div>
    </div>
  );
};

export default MovieList;
