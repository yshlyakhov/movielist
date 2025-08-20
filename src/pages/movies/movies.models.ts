export interface MovieType {
  id: number;
  label: "Now Playing" | "Popular" | "Top Rated" | "Upcoming";
}

export enum MovieTypes {
  POPULAR = 1,
  NOW_PLAYING = 2,
  TOP_RATED = 3,
  UPCOMING = 4,
}

export const MOVIES_TYPES: MovieType[] = [
  { id: 1, label: "Popular" },
  { id: 2, label: "Now Playing" },
  { id: 3, label: "Top Rated" },
  { id: 4, label: "Upcoming" },
];

export const DEFAULT_MOVIES_TYPE: MovieType = { ...MOVIES_TYPES[0] };
