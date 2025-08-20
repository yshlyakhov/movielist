import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_URL } from "../config/api.config";
import type {
  MovieDetails,
  MovieDetailsError,
  MovieDetailsRequest,
} from "./movie.api.models";

const transformResponseFn = (response: MovieDetails) => ({ ...response });

const transformErrorResponseFn = (response: {
  status: number;
  data: MovieDetailsError;
}) => ({
  status: response.status,
  ...response.data,
});

export const movieApiSlice = createApi({
  reducerPath: "movie",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getMovieDetails: builder.query({
      query: ({ id }: MovieDetailsRequest) => `/movie/${id}?api_key=${API_KEY}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
  }),
});

export const { useGetMovieDetailsQuery } = movieApiSlice;
