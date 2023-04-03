import { AppState, useAppSelector } from "@/store";

export function useUniversityAdministration() {
  return useAppSelector((state: AppState) => state.universityAdministration);
}
