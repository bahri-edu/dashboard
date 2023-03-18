import { AppState, useAppSelector } from "..";

export function useNews() {
  return useAppSelector((state: AppState) => state.news);
}
