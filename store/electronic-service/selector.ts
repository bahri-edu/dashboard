import { AppState, useAppSelector } from "@/store";

export function useEService() {
  return useAppSelector((state: AppState) => state.eService);
}
