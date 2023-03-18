import { AppState, useAppSelector } from "@/store";

export function useRelatedSite() {
  return useAppSelector((state: AppState) => state.relatedSite);
}
