import { AppState, useAppSelector } from "@/store";

export function useDeanshipStudentService() {
  return useAppSelector((state: AppState) => state.deanshipStudentService);
}
