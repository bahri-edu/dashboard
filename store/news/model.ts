import { Translate } from "@/utils/http.util";

export interface News {
  id: string;
  title: Translate;
  description: Translate;
  type: NewsTypeEnum;
  images?: string[];
}

export interface UpdateNews {
  id: string;
  news: Partial<News>;
}
export interface NewsResponse {
  data: News[];
  totalDocs: number;
  totalPages: number;
  page: number;
}

export enum NewsTypeEnum {
  ACADEMIC = "ACADEMIC",
  GENERAL = "GENERAL",
  CAREERS = "CAREERS",
}
