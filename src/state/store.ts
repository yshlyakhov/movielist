import { configureStore } from "@reduxjs/toolkit";
import { moviesApiSlice } from "../api/movies/moviesApiSlice";
import { movieApiSlice } from "../api/movie/movieApiSlice";
import { trendingApiSlice } from "../api/trending/trendingApiSlice";
import { tvApiSlice } from "../api/tv/tvApiSlice";

export const store = configureStore({
  reducer: {
    [trendingApiSlice.reducerPath]: trendingApiSlice.reducer,
    [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
    [tvApiSlice.reducerPath]: tvApiSlice.reducer,
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(trendingApiSlice.middleware)
      .concat(moviesApiSlice.middleware)
      .concat(tvApiSlice.middleware)
      .concat(movieApiSlice.middleware);
  },
});
