import { AppState, useAppSelector } from "@/store";

export function useContact() {
  return useAppSelector((state: AppState) => state.contact);
}
