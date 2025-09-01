import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_URL } from "../config/api.config";
import {
  type TrendingError,
  type TrendingRequest,
  type TrendingResponse,
} from "./trending.api.models";

export const trendingApiSlice = createApi({
  reducerPath: "trending",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getTrending: builder.query<TrendingResponse, TrendingRequest>({
      async queryFn(
        { page, time_window },
        _queryApi,
        _extraOptions,
        baseQuery
      ) {
        try {
          const promises = [
            baseQuery(
              `/trending/movie/${time_window}?api_key=${API_KEY}&page=${page}`
            ),
            baseQuery(
              `/trending/tv/${time_window}?api_key=${API_KEY}&page=${page}`
            ),
          ];

          const results = await Promise.allSettled(promises);
          const response = results.reduce(
            (acc, result) => {
              if (result.status === "fulfilled") {
                if (result.value.data) {
                  const data = result.value.data as TrendingResponse;
                  acc.data.results = acc.data.results.concat(data.results);
                  acc.data.total_pages = Math.max(
                    acc.data.total_pages,
                    data.total_pages
                  );
                  return acc;
                }
                if (result.value.error) {
                  acc.error.status = result.value.error.status;
                  acc.error.data.push(result.value.error.data as TrendingError);
                  return acc;
                }
              } else {
                acc.error.status = result.reason.error.status;
                acc.error.data.push(result.reason.error.data as TrendingError);
              }
              return acc;
            },
            {
              data: { total_pages: 0, results: [] } as TrendingResponse,
              error: { data: [] as TrendingError[] } as {
                status: number | string;
                data: TrendingError[];
              },
            }
          );

          if (response.error.data.length === results.length) {
            throw response.error;
          }

          return { data: response.data };
        } catch (e: unknown) {
          const error = e as { status: number; data: TrendingError[] };
          return { error };
        }
      },
    }),
  }),
});

export const { useGetTrendingQuery } = trendingApiSlice;
