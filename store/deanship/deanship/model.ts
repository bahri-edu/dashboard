import { Translate } from "@/utils/http.util";
import { DeanshipTypeEnum } from "..";

export interface Deanship {
  id: string;
  title: Translate;
  descriptions: Translate[];
  icon?: string;
  image?: string;
  deanshipType: DeanshipTypeEnum;
  seqNo: number;
}

export interface UpdateDeanship {
  id: string;
  change: Partial<Deanship>;
}
