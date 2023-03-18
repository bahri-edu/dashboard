import { AppState, useAppSelector } from "@/store";

export function useFactAndFigure() {
  return useAppSelector((state: AppState) => state.factAndFigure);
}
