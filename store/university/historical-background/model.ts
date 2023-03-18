export interface HistoricalBackground {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface UpdateHistoricalBackground {
  id: string;
  change: Partial<HistoricalBackground>;
}
