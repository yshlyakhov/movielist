import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useGetPopularMoviesQuery,
  useGetSearchedMoviesQuery,
  type MoviesError,
} from "../../api/movies/moviesApiSlice";
import Pagination from "@mui/material/Pagination";
import type React from "react";
import MovieSearch from "./MovieSearch";

import "./movies.css";
import MovieList from "./MovieList";

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
  const popularMovies = useGetPopularMoviesQuery(request, { skip: !!q });
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
  };

  const onPageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    navigate(`/movies/${page}${location.search}`);
  };

  // variables
  const data = [popularMovies, searchedMovies];
  const loading = data.some(({ isFetching }) => isFetching);
  const error = data.filter(({ error }) => error)?.[0]?.error as MoviesError & {
    status: number | string;
  };
  const { results, total_pages = 0 } =
    data.filter(({ status }) => status === "fulfilled")?.[0]?.data || {};

  return (
    <section className="movies-container">
      <MovieSearch
        q={q}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

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
            onChange={onPageChange}
          />
        </>
      )}
    </section>
  );
};

export default Movies;
