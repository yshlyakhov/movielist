import { configureStore } from "@reduxjs/toolkit";
import { moviesApiSlice } from "../api/movies/moviesApiSlice";

export const store = configureStore({
  reducer: {
    [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(moviesApiSlice.middleware);
  },
});
