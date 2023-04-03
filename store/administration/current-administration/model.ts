import { Translate } from "@/utils/http.util";
export enum CurrentPositionTypeEnum {
  VICE_CHANCELLOR,
  DEPUTY_VICE_CHANCELLOR,
  PRINCIPAL,
  SECRETARY_OF_SCIENTIFIC_AFFAIRS,
}

type Social = {
  icon: string;
  url: string;
};

export interface CurrentAdministration {
  id: string;
  name: Translate;
  imageUrl: string;
  birthdate: string;
  degree: Translate;
  email: string;
  phone: string;
  position: Translate;
  qualifications: Translate[];
  socials: Social[];
  positionType: CurrentPositionTypeEnum;
}

export interface UpdateCurrentAdministration {
  id: string;
  change: Partial<CurrentAdministration>;
}
