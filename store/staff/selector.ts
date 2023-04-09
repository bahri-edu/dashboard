import { AppState, useAppSelector } from "@/store";

export function useStaff() {
  return useAppSelector((state: AppState) => state.staff);
}
