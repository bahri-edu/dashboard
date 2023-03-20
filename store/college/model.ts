import { Translate } from "@/utils/http.util";

export interface College {
  id: string;
  name: Translate;
  code: string;
  location: Translate;
}

export interface UpdateCollege {
  id: string;
  college: Partial<College>;
}
