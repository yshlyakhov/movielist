import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const API_KEY = "e7cb1dd8f7c093b965424872dbcc03fe";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export interface MoviesRquest {
  page: number;
  query?: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MoviesError {
  status_code: number;
  status_message: string;
  success: boolean;
}

const transformResponseFn = (response: MoviesResponse) => ({
  results: response.results,
  total_pages: response.total_pages,
});

const transformErrorResponseFn = ({ status, data }: FetchBaseQueryError) => ({
  status,
  ...(data as MoviesError),
});

export const moviesApiSlice = createApi({
  reducerPath: "movies",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: ({ page }: MoviesRquest) =>
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
