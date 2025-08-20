export interface MovieDetails {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

export interface MovieDetailsRequest {
  id: number;
}

export interface MovieDetailsError {
  status_code: number;
  status_message: string;
  success: boolean;
}
