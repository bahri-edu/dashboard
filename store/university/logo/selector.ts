import { AppState, useAppSelector } from "@/store";

export function useLogo() {
  return useAppSelector((state: AppState) => state.logo);
}
