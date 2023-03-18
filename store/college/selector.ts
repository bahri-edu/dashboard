import { AppState, useAppSelector } from "..";

export function useCollege() {
  return useAppSelector((state: AppState) => state.college);
}
