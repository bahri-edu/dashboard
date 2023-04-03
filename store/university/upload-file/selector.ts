import { AppState, useAppSelector } from "@/store";

export function useUploadFile() {
  return useAppSelector((state: AppState) => state.uploadFile);
}
