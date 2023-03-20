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

export enum NewsTypeEnum {
  ACADEMIC = "ACADEMIC",
  GENERAL = "GENERAL",
}
