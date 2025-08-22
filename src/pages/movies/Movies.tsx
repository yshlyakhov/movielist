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
} from "../../api/movies/moviesApiSlice";
import Pagination from "@mui/material/Pagination";
import type React from "react";
import MovieSearch from "../../shared/movie/MovieSearch";
import MoviesTypeSelect from "./MoviesTypeSelect";
import { useEffect, useState } from "react";
import {
  DEFAULT_MOVIES_TYPE,
  MovieTypes,
  type MovieType,
} from "./movies.models";
import type { MoviesError } from "../../api/movies/movies.api.models";
import MovieList from "../../shared/movie/MovieList";

import "./movies.css";

const Movies = () => {
  // hooks
  const { page } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page, 10) : 1);
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [moviesType, setMoviesType] = useState<MovieType>(DEFAULT_MOVIES_TYPE);

  const request = {
    page: currentPage,
    query: q,
  };

  // re-render on Navigation action
  useEffect(() => {
    const { pathname, search } = location;
    if (pathname === "/movies" && search === "") {
      setQ(""); // reset search input on Navbar event
      setCurrentPage(1);
    }
  }, [location]);

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
  const handleSearchChange = (value: string) => {
    if (value.length === 0) {
      setCurrentPage(1);
      navigate("/movies");
    }
  };

  const handleSearchSubmit = (value: string) => {
    setQ(value);
    setCurrentPage(1);
    setMoviesType(DEFAULT_MOVIES_TYPE);
    const searchParams = value ? `?q=${encodeURIComponent(value)}` : ``;
    navigate(`/movies${searchParams}`);
  };

  const handleMoviesTypeChange = (type: MovieType) => {
    setQ("");
    setCurrentPage(1);
    setMoviesType(type);
    navigate("/movies");
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
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
    status: number;
  };
  const { results, total_pages = 0 } =
    data.filter(({ status }) => status === "fulfilled")?.[0]?.data || {};

  return (
    <section className="content-container movies-container">
      <div className="movies-controls">
        <MoviesTypeSelect
          moviesType={moviesType}
          onChange={handleMoviesTypeChange}
        />
        <MovieSearch
          key={q} // rerender on Q change
          label="Search for movies..."
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
