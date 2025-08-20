import { useMoviesContext } from "../../contexts/MoviesContext";
import MovieList from "../movies/MovieList";
import "./favorites.css";

const Favorites = () => {
  const { favorites } = useMoviesContext();

  if (favorites.length) {
    return (
      <section className="favorites-container">
        <h2>Your favorites</h2>
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
