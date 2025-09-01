import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {
  useGetPopularTvQuery,
  useGetOnTheAirTvQuery,
  useGetTopRatedTvQuery,
  useGetAiringTodayTvQuery,
  useGetSearchedTvQuery,
} from "../../api/tv/tvApiSlice";
import MovieSearch from "../../shared/movie/MovieSearch";
import TypeSelect from "../../shared/movie/TypeSelect";
import MovieList from "../../shared/movie/MovieList";
import { DEFAULT_TV_TYPE, TV_TYPES, TvTypes, type TvType } from "./tv.models";
import type { TvError } from "../../api/tv/tv.api.models";

import "../movies/movies.css";
import { useRendersCount } from "../../hooks/renders-count";

const TV = () => {
  useRendersCount("TV");

  // hooks
  const { page } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page, 10) : 1);
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [tvType, setTvType] = useState<TvType>(DEFAULT_TV_TYPE);

  const request = {
    page: currentPage,
    query: q,
  };

  // re-render on Navigation action
  useEffect(() => {
    const { pathname, search, state } = location;
    if (pathname === "/tv" && search === "") {
      setQ(""); // reset search input on Navbar event
      setCurrentPage(1);
      if (state) {
        setTvType(DEFAULT_TV_TYPE);
      }
    }
  }, [location]);

  const popularTv = useGetPopularTvQuery(request, {
    skip:
      !!q ||
      [TvTypes.ON_THE_AIR, TvTypes.TOP_RATED, TvTypes.AIRING_TODAY].includes(
        tvType.id
      ),
  });
  const onTheAirTv = useGetOnTheAirTvQuery(request, {
    skip:
      !!q ||
      [TvTypes.POPULAR, TvTypes.TOP_RATED, TvTypes.AIRING_TODAY].includes(
        tvType.id
      ),
  });
  const topRatedTv = useGetTopRatedTvQuery(request, {
    skip:
      !!q ||
      [TvTypes.POPULAR, TvTypes.ON_THE_AIR, TvTypes.AIRING_TODAY].includes(
        tvType.id
      ),
  });
  const airingTodayTv = useGetAiringTodayTvQuery(request, {
    skip:
      !!q ||
      [TvTypes.POPULAR, TvTypes.ON_THE_AIR, TvTypes.TOP_RATED].includes(
        tvType.id
      ),
  });
  const searchedTv = useGetSearchedTvQuery(request, { skip: !q });

  // handlers
  const handleSearchChange = (value: string) => {
    if (value.length === 0) {
      setCurrentPage(1);
      navigate("/tv");
    }
  };

  const handleSearchSubmit = (value: string) => {
    setQ(value);
    setCurrentPage(1);
    setTvType(DEFAULT_TV_TYPE);
    const searchParams = value ? `?q=${encodeURIComponent(value)}` : ``;
    navigate(`/tv${searchParams}`);
  };

  const handleTvTypeChange = (type: TvType) => {
    setQ("");
    setCurrentPage(1);
    setTvType(type);
    navigate("/tv");
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/tv/${page}${location.search}`);
  };

  // variables
  const data = [popularTv, onTheAirTv, topRatedTv, airingTodayTv, searchedTv];
  const loading = data.some(({ isFetching }) => isFetching);
  const error = data.filter(({ error }) => error)?.[0]?.error as TvError & {
    status: number;
  };
  const { results, total_pages = 0 } =
    data.filter(({ status }) => status === "fulfilled")?.[0]?.data || {};

  return (
    <section className="content-container movies-container">
      <h1>TV Series</h1>

      <div className="movies-controls">
        <TypeSelect<TvType>
          label="TV"
          items={TV_TYPES}
          itemsType={tvType}
          onChange={handleTvTypeChange}
        />
        <MovieSearch
          key={q} // rerender on Q change
          label="Search for TV..."
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
          <h2>No TV found</h2>
          <p>Refine your search</p>
        </section>
      )}
    </section>
  );
};

export default TV;
