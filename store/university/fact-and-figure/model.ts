import { Translate } from "@/utils/http.util";

export interface FactAndFigure {
  id: string;
  count: number;
  description: Translate;
  type: FactType;
}

export interface UpdateFactAndFigure {
  id: string;
  change: Partial<FactAndFigure>;
}

export enum FactType {
  STUDENT = "STUDENT",
  STAFF = "STAFF",
}
