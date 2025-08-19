import { createContext, useContext } from "react";
import type { Movie } from "../api/movies/moviesApiSlice";

interface ContextValue {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const MoviesContext = createContext<ContextValue>({} as ContextValue);
export const useMoviesContext = () => useContext(MoviesContext);
