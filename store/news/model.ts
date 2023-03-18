export interface News {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  type: NewsTypeEnum;
  images?: string[];
}

export interface UpdateNews {
  id: string;
  news: Partial<News>;
}

export enum NewsTypeEnum {
  ACADEMIC = "ACADEMIC",
  GENERAL = "GENERAL",
}
