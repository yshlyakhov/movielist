import { useNavigate } from "react-router-dom";
import ImageElement from "../image/ImageElement";
import FavoriteButton from "../../pages/favorites/FavoriteButton";
import type { Movie } from "./movie.models";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    name,
    overview,
    poster_path,
    release_date,
    vote_average,
    media_type,
  } = movie;

  const onClick = () => {
    navigate(`/movie/${media_type}_${id}`);
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
          <p>{overview}</p>
        </div>
      </div>
      <div className="movie-info">
        <h3>{title || name}</h3>
        <section className="flex justify-between">
          <p>{release_date}</p>
          <span className="user-rating">{vote_average}</span>
        </section>
      </div>
    </div>
  );
};

export default MovieCard;
