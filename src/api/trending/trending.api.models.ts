import type { TimeWindow } from "../../pages/trending/trending.models";
import type { Movie } from "../../shared/movie/movie.models";

export interface TrendingRequest {
  page: number;
  time_window: TimeWindow;
}

export interface TrendingResponse {
  page?: number;
  results: Movie[];
  total_pages: number;
  total_results?: number;
}

export interface TrendingError {
  status_code: number;
  status_message: string;
  success: boolean;
}
