import { AppState, useAppSelector } from "@/store";

export function useDeanship() {
  return useAppSelector((state: AppState) => state.deanship);
}
