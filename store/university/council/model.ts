import { Translate } from "@/utils/http.util";

export interface DescriptionList {
  title: Translate;
  description: Translate;
}
export interface CouncilDescription {
  ar: string;
  en: string;
  lists?: DescriptionList[];
}

export interface Council {
  id: string;
  title: Translate;
  descriptions: CouncilDescription[];
  councilType: CouncilTypeEnum;
  image?: string;
}

export interface UpdateCouncil {
  id: string;
  change: Partial<Council>;
}

export enum CouncilTypeEnum {
  UNIVERSITYCOUNCIL = "university-council",
  DEANSCOUNCIL = "deans-council",
  PROFESSORSCOUNCIL = "professors-council",
}
