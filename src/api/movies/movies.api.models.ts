import type { Movie } from "../../shared/movie/movie.models";

export interface MoviesRequest {
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
