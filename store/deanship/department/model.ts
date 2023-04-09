import { Translate } from "@/utils/http.util";
import { DeanshipTypeEnum } from "..";

export interface DeanshipDepartment {
  id: string;
  title: Translate;
  icon?: string;
  url?: string;
  description?: Translate;
  deanshipType: DeanshipTypeEnum;
  seqNo: number;
}

export interface UpdateDeanshipDepartment {
  id: string;
  change: Partial<DeanshipDepartment>;
}
