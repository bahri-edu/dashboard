import { Translate } from "@/utils/http.util";

export interface HistoricalBackground {
  id: string;
  title: Translate;
  description: Translate;
}

export interface UpdateHistoricalBackground {
  id: string;
  change: Partial<HistoricalBackground>;
}
