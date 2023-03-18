import { Translate } from "@/utils/http.util";

export interface RelatedSite {
  id: string;
  text: Translate;
  url: string;
  sqNo: number;
}

export interface UpdateRelatedSite {
  id: string;
  change: Partial<RelatedSite>;
}
