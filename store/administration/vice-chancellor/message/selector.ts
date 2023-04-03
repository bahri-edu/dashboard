import { AppState, useAppSelector } from "@/store";

export function useViceChancellorMessage() {
  return useAppSelector((state: AppState) => state.viceChancellorMessage);
}
