import type { Movie } from "../../api/movies/movies.api.models";
import MovieCard from "./MovieCard";

interface Props {
  movies: Movie[];
}

const MovieList = ({ movies }: Props) => {
  return (
    <>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default MovieList;
