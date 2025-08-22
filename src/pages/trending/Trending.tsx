import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useGetTrendingQuery } from "../../api/trending/trendingApiSlice";
import MovieList from "../../shared/movie/MovieList";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DEFAULT_MEDIA_TYPES,
  DEFAULT_TIME_WINDOW,
  DEFAULT_TRENDING_REQUEST,
  TIME_WINDOW,
  type TimeWindowModel,
} from "./trending.models";
import type { TrendingError } from "../../api/trending/trending.api.models";

const Trending = () => {
  // hooks
  const { page } = useParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page, 10) : 1);
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    ...DEFAULT_TRENDING_REQUEST,
    page: currentPage,
  });
  const [mediaTypes, setMediaTypes] = useState(DEFAULT_MEDIA_TYPES);
  const [timeWindowType, setTimeWindowType] =
    useState<TimeWindowModel>(DEFAULT_TIME_WINDOW);

  // re-render on Navigation action
  useEffect(() => {
    const { pathname, state } = location;

    if (pathname === "/") {
      // handle component navigation("/")
      setCurrentPage(1);
    }
    if (state) {
      setMediaTypes(DEFAULT_MEDIA_TYPES);
      setTimeWindowType(DEFAULT_TIME_WINDOW);
      setRequest({ ...DEFAULT_TRENDING_REQUEST });
    }
  }, [location]);

  const { data, isLoading, error } = useGetTrendingQuery(request);

  // handlers
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    setRequest({ ...request, page });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/${page}`);
  };

  const handleMediaType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMediaTypes({
      ...mediaTypes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTimeWindowChange = (event: SelectChangeEvent<number>) => {
    const type = TIME_WINDOW.find(
      (v) => v.id === event.target.value
    ) as TimeWindowModel;
    setTimeWindowType(type);
    setCurrentPage(1);
    setRequest({ time_window: type.label, page: 1 });
    navigate("/");
  };

  // variables
  const { movie, tv } = mediaTypes;
  const results = data?.results;

  let renderedItems;
  if (movie && tv) {
    renderedItems = results?.slice();
  } else if (movie) {
    renderedItems = results?.filter(({ media_type }) => media_type === "movie");
  } else if (tv) {
    renderedItems = results?.filter(({ media_type }) => media_type === "tv");
  }
  const total_pages = data?.total_pages ?? 0;
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
      <h2>Trending</h2>

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
            onClick={() => navigate("/", { state: Date.now() })}
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
        <>
          <MovieList movies={renderedItems} />
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
    </section>
  );
};

export default Trending;
