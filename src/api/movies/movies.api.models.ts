export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

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
