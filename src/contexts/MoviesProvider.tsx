import { useEffect, useState } from "react";
import { MoviesContext } from "./MoviesContext";
import type { Movie } from "../api/movies/moviesApiSlice";

const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const storedFavorites = JSON.parse(localStorage.getItem("FAVORITES") || "[]");

  const [favorites, setFavorites] = useState<Movie[]>(storedFavorites);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("FAVORITES");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev: Movie[]) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export default MoviesProvider;
