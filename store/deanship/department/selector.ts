import { AppState, useAppSelector } from "@/store";

export function useDeanshipDepartment() {
  return useAppSelector((state: AppState) => state.deanshipDepartment);
}
