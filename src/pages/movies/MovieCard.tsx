import { useNavigate } from "react-router-dom";
import ImageElement from "../../shared/ImageElement";
import type { Movie } from "../../api/movies/moviesApiSlice";
import FavoriteButton from "../favorites/FavoriteButton";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();
  const { id, title, poster_path, release_date } = movie;

  const onClick = () => {
    navigate(`/movie/${id}`);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onClick();
      event.preventDefault();
    }
  };

  return (
    <div
      tabIndex={0}
      className="movie-card"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div className="movie-poster">
        <ImageElement
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <div className="movie-overlay">
          <FavoriteButton movie={movie}></FavoriteButton>
        </div>
      </div>
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
