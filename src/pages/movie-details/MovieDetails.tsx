import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageElement from "../../shared/image/ImageElement";
import FavoriteButton from "../favorites/FavoriteButton";
import { useGetMovieDetailsQuery } from "../../api/movie/movieApiSlice";
import type { MovieDetailsError } from "../../api/movie/movie.api.models";
import type { Movie } from "../../shared/movie/movie.models";

import "./movie-details.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/movies", { replace: true });
    }
  }, [id, navigate]);

  const {
    data: details,
    isLoading,
    error,
  } = useGetMovieDetailsQuery({ id: parseInt(id as string, 10) });
  const movie = {
    id: details?.id,
    title: details?.title,
    poster_path: details?.poster_path,
    release_date: details?.release_date,
    vote_average: details?.vote_average,
  } as Movie;
  const error_message = (
    error as MovieDetailsError & {
      status: number;
    }
  )?.status_message;

  return (
    <section className="movie-details">
      {isLoading && <p className="loading">Loading...</p>}

      {error && <p className="error-message">{error_message}</p>}

      {details && (
        <>
          <ImageElement
            src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
            alt={details.title}
          />
          <FavoriteButton
            style={{
              position: "fixed",
              top: "calc(72px + 2rem)",
              right: "2rem",
            }}
            movie={movie}
          ></FavoriteButton>
          <pre>{JSON.stringify(details, null, 4)}</pre>
        </>
      )}
    </section>
  );
};

export default MovieDetails;
