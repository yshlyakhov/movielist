import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_URL } from "../config/api.config";
import {
  transformErrorResponseFn,
  transformResponseFn,
  type TvRequest,
} from "./tv.api.models";

export const tvApiSlice = createApi({
  reducerPath: "tv",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPopularTv: builder.query({
      query: ({ page }: TvRequest) =>
        `/tv/popular?api_key=${API_KEY}&page=${page}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
    getOnTheAirTv: builder.query({
      query: ({ page }) => `/tv/on_the_air?api_key=${API_KEY}&page=${page}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
    getTopRatedTv: builder.query({
      query: ({ page }) => `/tv/top_rated?api_key=${API_KEY}&page=${page}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
    getAiringTodayTv: builder.query({
      query: ({ page }) => `/tv/airing_today?api_key=${API_KEY}&page=${page}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
    getSearchedTv: builder.query({
      query: ({ query, page }) =>
        `/search/tv?api_key=${API_KEY}&page=${page}&query=${encodeURIComponent(
          query
        )}`,
      transformResponse: transformResponseFn,
      transformErrorResponse: transformErrorResponseFn,
    }),
  }),
});

export const {
  useGetPopularTvQuery,
  useGetOnTheAirTvQuery,
  useGetTopRatedTvQuery,
  useGetAiringTodayTvQuery,
  useGetSearchedTvQuery,
} = tvApiSlice;
