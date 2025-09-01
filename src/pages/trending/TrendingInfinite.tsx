import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useGetTrendingQuery } from "../../api/trending/trendingApiSlice";
import MovieList from "../../shared/movie/MovieList";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DEFAULT_MEDIA_TYPES,
  DEFAULT_TIME_WINDOW,
  DEFAULT_TRENDING_REQUEST,
  TIME_WINDOW,
  type TimeWindowModel,
} from "./trending.models";

import type { TrendingError } from "../../api/trending/trending.api.models";
import InfiniteScroll from "../../shared/infinite-scroll/InfiniteScroll";
import type { Movie } from "../../shared/movie/movie.models";
import { useRendersCount } from "../../hooks/renders-count";

const TrendingInfinite = () => {
  useRendersCount("TRENDING_INFINITE");

  // hooks
  const settings = useRef(
    JSON.parse(localStorage.getItem("TRENDING_SETTINGS") || "{}")
  );

  const navigate = useNavigate();
  const [request, setRequest] = useState({
    ...DEFAULT_TRENDING_REQUEST,
  });
  const [mediaTypes, setMediaTypes] = useState(DEFAULT_MEDIA_TYPES);
  const [timeWindowType, setTimeWindowType] =
    useState<TimeWindowModel>(DEFAULT_TIME_WINDOW);
  const [items, setItems] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const { data, isLoading, isFetching, error } = useGetTrendingQuery(request);

  useEffect(() => {
    if (Object.keys(settings.current).length > 0) {
      setMediaTypes(settings.current);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("TRENDING_SETTINGS", JSON.stringify(mediaTypes));
  }, [mediaTypes]);

  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching]);

  // init data
  useEffect(() => {
    if (loading) return;
    if (errorData) {
      setItems([]);
      return;
    }
    setItems((prev) => prev.concat(data?.results || []));
  }, [data, loading]);

  const renderedItems = useMemo(() => {
    const { movie, tv } = mediaTypes;
    if ((movie && tv) || (!movie && !tv)) {
      return items.slice();
    } else if (movie) {
      return items.filter(({ media_type }) => media_type === "movie");
    } else if (tv) {
      return items.filter(({ media_type }) => media_type === "tv");
    }
  }, [mediaTypes, items]);

  // handlers
  const handleMediaType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("handleMediaType");

      setMediaTypes({
        ...mediaTypes,
        [event.target.name]: event.target.checked,
      });
    },
    [mediaTypes]
  );

  const handleTimeWindowChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      const type = TIME_WINDOW.find(
        (v) => v.id === event.target.value
      ) as TimeWindowModel;
      setTimeWindowType(type);
      setRequest({ time_window: type.label, page: 1 });
      setItems([]);
    },
    []
  );

  const handleLoadMore = useCallback(() => {
    setRequest((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  }, []);

  // variables
  const { movie, tv } = mediaTypes;
  const seen = new Set();
  const errorData = (
    error as { status: number; data: TrendingError[] }
  )?.data.filter((item) => {
    if (seen.has(item.status_code)) {
      return false;
    } else {
      seen.add(item.status_code);
      return true;
    }
  });

  return (
    <section className="content-container">
      <h1>Trending</h1>

      {/* @todo move to separate component */}
      <section className="flex flex-row">
        <FormControl
          sx={{
            flexDirection: "row",
            gap: "1rem",
            "& .MuiSvgIcon-root": { fontSize: 32 },
          }}
          component="fieldset"
          variant="standard"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={movie}
                onChange={handleMediaType}
                name="movie"
              />
            }
            label="movies"
          />
          <FormControlLabel
            control={
              <Checkbox checked={tv} onChange={handleMediaType} name="tv" />
            }
            label="tv"
          />
        </FormControl>

        <FormControl sx={{ marginLeft: "1rem", minWidth: 240 }} size="medium">
          <InputLabel id="trending-time-window-select-label">
            Time window
          </InputLabel>
          <Select
            labelId="trending-time-window-select-label"
            id="trending-time-window-select"
            value={timeWindowType.id}
            label="Time window"
            onChange={handleTimeWindowChange}
          >
            {TIME_WINDOW.map((type) => (
              <MenuItem value={type.id}>{type.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </section>

      {isLoading && <p className="loading">Loading...</p>}

      {error && (
        <>
          <ul>
            {errorData.map(({ status_message }, index) => (
              <li key={index}>
                <p className="error-message">{status_message}</p>
              </li>
            ))}
          </ul>
          <Button
            className="justify-self-center"
            onClick={() =>
              navigate("/trending-infinite", { state: Date.now() })
            }
            size="small"
            type="button"
            variant="contained"
            color="success"
          >
            Try again
          </Button>
        </>
      )}

      {renderedItems && renderedItems.length > 0 && (
        <InfiniteScroll loading={loading} onLoadMore={handleLoadMore}>
          <MovieList movies={renderedItems} />
        </InfiniteScroll>
      )}
    </section>
  );
};

export default TrendingInfinite;
