import { useMoviesContext } from "../../contexts/MoviesContext";
import MovieList from "../../shared/movie/MovieList";

import "./favorites.css";

const Favorites = () => {
  const { favorites } = useMoviesContext();

  if (favorites.length) {
    return (
      <section className="content-container favorites-container">
        <h1>Your favorites</h1>

        <MovieList movies={favorites} />
      </section>
    );
  }

  return (
    <section className="favorites-empty">
      <h2>No favorites movies yet</h2>
      <p>Time to add something</p>
    </section>
  );
};

export default Favorites;
