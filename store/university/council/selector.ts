import { AppState, useAppSelector } from "@/store";

export function useCouncil() {
  return useAppSelector((state: AppState) => state.council);
}
