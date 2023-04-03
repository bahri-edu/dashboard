import { Translate } from "@/utils/http.util";

export interface EService {
  id: string;
  title: Translate;
  icon: string;
  url: string;
  seqNo: number;
}

export interface UpdateEService {
  id: string;
  change: Partial<EService>;
}
