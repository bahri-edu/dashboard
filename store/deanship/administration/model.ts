import { Translate } from "@/utils/http.util";
import { DeanshipTypeEnum } from "..";

interface Social {
  icon: string;
  url: string;
}

export interface DeanshipAdministration {
  id: string;
  possison: Translate;
  name: Translate;
  degree: Translate;
  email: string;
  phone: string;
  image?: string;
  socials?: Social[];
  deanshipType: DeanshipTypeEnum;
  seqNo: number;
}

export interface UpdateDeanshipAdministration {
  id: string;
  change: Partial<DeanshipAdministration>;
}
