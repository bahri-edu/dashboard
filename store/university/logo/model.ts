import { Translate } from "@/utils/http.util";

export interface Logo {
  id: string;
  title: Translate;
  description: Translate;
  sqNo: number;
}

export interface UpdateLogo {
  id: string;
  change: Partial<Logo>;
}
