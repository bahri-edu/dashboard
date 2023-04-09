import { Translate } from "@/utils/http.util";
import { DeanshipTypeEnum } from "..";

export interface DeanshipStudentService {
  id: string;
  title: Translate;
  icon?: string;
  url?: string;
  description?: Translate;
  deanshipType: DeanshipTypeEnum;
  seqNo: number;
}

export interface UpdateDeanshipStudentService {
  id: string;
  change: Partial<DeanshipStudentService>;
}
