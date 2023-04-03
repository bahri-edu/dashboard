import { Translate } from "@/utils/http.util";

export interface ViceChancellorMessage {
  id: string;
  title: Translate;
  descriptions: Translate[];
}

export interface UpdateViceChancellorMessage {
  id: string;
  change: Partial<ViceChancellorMessage>;
}
