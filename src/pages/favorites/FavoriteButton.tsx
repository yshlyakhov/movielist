import type { CSSProperties, MouseEvent } from "react";
import { useMoviesContext } from "../../contexts/MoviesContext";
import type { Movie } from "../../api/movies/moviesApiSlice";

interface Props {
  movie: Movie;
  style?: CSSProperties;
}

const FavoriteButton = ({ style, movie }: Props) => {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useMoviesContext();
  const { id } = movie;
  const favorite = isFavorite(id);

  const onFavoriteClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (favorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <button
      style={style}
      className={`favorite-btn ${favorite ? "active" : ""}`}
      onClick={onFavoriteClick}
    >
      &#x2665;
    </button>
  );
};

export default FavoriteButton;
