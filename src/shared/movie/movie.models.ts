export type MediaType = "movie" | "tv";
export interface Movie {
  id: number;
  media_type: MediaType;
  title: string; // movie
  name: string; // tv
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}
