import type { TrendingRequest } from "../../api/trending/trending.api.models";

export type TimeWindow = "day" | "week";

export const DEFAULT_TRENDING_REQUEST: TrendingRequest = {
  page: 1,
  time_window: "day",
};

export interface TimeWindowModel {
  id: number;
  label: TimeWindow;
}

export const DEFAULT_MEDIA_TYPES = {
  movie: true,
  tv: true,
};

export const DEFAULT_TIME_WINDOW: TimeWindowModel = { id: 1, label: "day" };

export const TIME_WINDOW: TimeWindowModel[] = [
  { id: 1, label: "day" },
  { id: 2, label: "week" },
];
