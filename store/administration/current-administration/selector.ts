import { AppState, useAppSelector } from "@/store";

export function useCurrentAdministration() {
  return useAppSelector((state: AppState) => state.currentAdministration);
}
