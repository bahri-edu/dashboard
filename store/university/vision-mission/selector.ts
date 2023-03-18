import { AppState, useAppSelector } from "@/store";

export function useVisionMission() {
  return useAppSelector((state: AppState) => state.visionMission);
}
