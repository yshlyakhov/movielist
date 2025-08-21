import { configureStore } from "@reduxjs/toolkit";
import { moviesApiSlice } from "../api/movies/moviesApiSlice";
import { movieApiSlice } from "../api/movie/movieApiSlice";
import { trendingApiSlice } from "../api/trending/trendingApiSlice";

export const store = configureStore({
  reducer: {
    [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
    [trendingApiSlice.reducerPath]: trendingApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(moviesApiSlice.middleware)
      .concat(movieApiSlice.middleware)
      .concat(trendingApiSlice.middleware);
  },
});
