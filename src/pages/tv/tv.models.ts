export interface TvType {
  id: number;
  label: "Popular" | "On The Air" | "Top Rated" | "Airing Today";
}

export enum TvTypes {
  POPULAR = 1,
  ON_THE_AIR = 2,
  TOP_RATED = 3,
  AIRING_TODAY = 4,
}

export const TV_TYPES: TvType[] = [
  { id: 1, label: "Popular" },
  { id: 2, label: "On The Air" },
  { id: 3, label: "Top Rated" },
  { id: 4, label: "Airing Today" },
];

export const DEFAULT_TV_TYPE: TvType = { ...TV_TYPES[0] };
