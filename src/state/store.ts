import { configureStore } from "@reduxjs/toolkit";
import { moviesApiSlice } from "../api/movies/moviesApiSlice";
import { movieApiSlice } from "../api/movie/movieApiSlice";

export const store = configureStore({
  reducer: {
    [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
    [movieApiSlice.reducerPath]: movieApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(moviesApiSlice.middleware)
      .concat(movieApiSlice.middleware);
  },
});
