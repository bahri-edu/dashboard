import { AppState, useAppSelector } from "@/store";

export function useHistoricalBackground() {
  return useAppSelector((state: AppState) => state.historicalBackground);
}
