import { useEffect, useMemo, useState } from "react";
import { MoviesContext } from "./MoviesContext";
import type { Movie } from "../shared/movie/movie.models";

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

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites: (movie: Movie) => {
        setFavorites((prev: Movie[]) => [movie, ...prev]);
      },
      removeFromFavorites: (movieId: number) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
      },
      isFavorite: (movieId: number) => {
        return favorites.some((movie) => movie.id === movieId);
      },
    }),
    [favorites]
  );

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export default MoviesProvider;
