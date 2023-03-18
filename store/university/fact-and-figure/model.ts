export interface FactAndFigure {
  id: string;
  count: number;
  descriptionAr: string;
  descriptionEn: string;
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
