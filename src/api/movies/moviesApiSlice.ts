import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  type MoviesError,
  type MoviesRequest,
  type MoviesResponse,
} from "./movies.api.models";
import { API_KEY, BASE_URL } from "../config/api.config";

const transformResponseFn = (response: MoviesResponse) => ({
  results: response.results,
  total_pages: response.total_pages,
});

const transformErrorResponseFn = (response: {
  status: number;
  data: MoviesError;
}) => ({
  status: response.status,
  ...response.data,
});

export const moviesApiSlice = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: ({ page }: MoviesRequest) =>
        `/movie/popular?api_key=${API_KEY}&page=${page}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
    getNowPlayingMovies: builder.query({
      query: ({ page }) => `/movie/now_playing?api_key=${API_KEY}&page=${page}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
    getTopRatedMovies: builder.query({
      query: ({ page }) => `/movie/top_rated?api_key=${API_KEY}&page=${page}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
    getUpcomingMovies: builder.query({
      query: ({ page }) => `/movie/upcoming?api_key=${API_KEY}&page=${page}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
    getSearchedMovies: builder.query({
      query: ({ query, page }) =>
        `/search/movie?api_key=${API_KEY}&page=${page}&query=${encodeURIComponent(
          query
        )}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetSearchedMoviesQuery,
  useLazyGetSearchedMoviesQuery,
} = moviesApiSlice;
