import type { MediaType, Movie } from "../../shared/movie/movie.models";

export interface TvRequest {
  page: number;
  query?: string;
}

export interface TvResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TvError {
  status_code: number;
  status_message: string;
  success: boolean;
}

export const transformResponseFn = (response: TvResponse) => ({
  results: response.results.map((item) => ({
    ...item,
    media_type: "tv" as MediaType,
  })),
  total_pages: response.total_pages,
});

export const transformErrorResponseFn = (response: {
  status: number;
  data: TvError;
}) => ({
  status: response.status,
  ...response.data,
});
