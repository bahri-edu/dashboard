import { AppState, useAppSelector } from "@/store";

export function useDeanshipAdministration() {
  return useAppSelector((state: AppState) => state.deanshipAdministration);
}
