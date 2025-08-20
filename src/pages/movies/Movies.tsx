import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetSearchedMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  type MoviesError,
} from "../../api/movies/moviesApiSlice";
import Pagination from "@mui/material/Pagination";
import type React from "react";
import MovieSearch from "./MovieSearch";

import "./movies.css";
import MovieList from "./MovieList";
import MoviesTypeSelect from "./MoviesTypeSelect";
import { useState } from "react";
import {
  DEFAULT_MOVIES_TYPE,
  MovieTypes,
  type MovieType,
} from "./movies.models";

const Movies = () => {
  // hooks
  const { page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const location = useLocation();
  const navigate = useNavigate();
  const request = {
    page: currentPage,
    query: q,
  };
  const [moviesType, setMoviesType] = useState<MovieType>(DEFAULT_MOVIES_TYPE);

  // reset controls on default route /movies
  // useEffect(() => {
  //   const { pathname, search } = location;
  //   console.log(location);

  //   if (pathname === "/movies" && search === "") {
  //     setMoviesType(1);
  //     q = "";
  //   }
  // }, [location]);

  const popularMovies = useGetPopularMoviesQuery(request, {
    skip:
      !!q ||
      [
        MovieTypes.NOW_PLAYING,
        MovieTypes.TOP_RATED,
        MovieTypes.UPCOMING,
      ].includes(moviesType.id),
  });
  const nowPlayingMovies = useGetNowPlayingMoviesQuery(request, {
    skip:
      !!q ||
      [MovieTypes.POPULAR, MovieTypes.TOP_RATED, MovieTypes.UPCOMING].includes(
        moviesType.id
      ),
  });
  const topRatedMovies = useGetTopRatedMoviesQuery(request, {
    skip:
      !!q ||
      [
        MovieTypes.POPULAR,
        MovieTypes.NOW_PLAYING,
        MovieTypes.UPCOMING,
      ].includes(moviesType.id),
  });
  const upcomigMovies = useGetUpcomingMoviesQuery(request, {
    skip:
      !!q ||
      [
        MovieTypes.POPULAR,
        MovieTypes.NOW_PLAYING,
        MovieTypes.TOP_RATED,
      ].includes(moviesType.id),
  });
  const searchedMovies = useGetSearchedMoviesQuery(request, { skip: !q });

  // handlers
  const handleSearchChange = (q: string) => {
    if (q.length === 0) {
      navigate("/movies");
    }
  };

  const handleSearchSubmit = (q: string) => {
    const searchParams = q ? `?q=${encodeURIComponent(q)}` : ``;
    navigate(`/movies${searchParams}`);
    setMoviesType(DEFAULT_MOVIES_TYPE);
  };

  const handleMoviesTypeChange = (type: MovieType) => {
    setMoviesType(type);
    navigate("/movies");
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/movies/${page}${location.search}`);
  };

  // variables
  const data = [
    popularMovies,
    nowPlayingMovies,
    topRatedMovies,
    upcomigMovies,
    searchedMovies,
  ];
  const loading = data.some(({ isFetching }) => isFetching);
  const error = data.filter(({ error }) => error)?.[0]?.error as MoviesError & {
    status: number | string;
  };
  const { results, total_pages = 0 } =
    data.filter(({ status }) => status === "fulfilled")?.[0]?.data || {};

  return (
    <section className="movies-container">
      <div className="movies-controls">
        <MoviesTypeSelect
          moviesType={moviesType}
          onChange={handleMoviesTypeChange}
        />
        <MovieSearch
          q={q}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
      </div>

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error-message">{error.status_message}</p>}

      {results && results.length > 0 && (
        <>
          <MovieList movies={results} />
          <Pagination
            count={total_pages}
            page={currentPage}
            boundaryCount={2}
            showFirstButton
            showLastButton
            onChange={handlePageChange}
          />
        </>
      )}

      {results && results.length === 0 && (
        <section className="movies-empty">
          <h2>No movies found</h2>
          <p>Refine your search</p>
        </section>
      )}
    </section>
  );
};

export default Movies;
