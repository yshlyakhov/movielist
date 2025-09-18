import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageElement from "../../shared/image/ImageElement";
import FavoriteButton from "../favorites/FavoriteButton";
import { useGetMovieDetailsQuery } from "../../api/movie/movieApiSlice";
import type {
  MovieDetailsError,
  MovieDetailsRequest,
} from "../../api/movie/movie.api.models";
import type { MediaType, Movie } from "../../shared/movie/movie.models";

import "./movie-details.css";

const MovieDetails = () => {
  const { mediaId } = useParams();
  const [media_type, id] = (mediaId || "").split("_");
  const request: MovieDetailsRequest = {
    id: parseInt(id, 10),
    media_type: media_type as MediaType,
  };
  const navigate = useNavigate();

  // router guard
  useEffect(() => {
    if (!id || !/^\d+$/.test(id)) {
      navigate("/movies", { replace: true });
    }
  }, [id, navigate]);

  const { data: details, isLoading, error } = useGetMovieDetailsQuery(request);
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
