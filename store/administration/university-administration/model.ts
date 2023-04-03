import { Translate } from "@/utils/http.util";

export interface Info {
  title: Translate;
  icon: string;
  description: Translate;
}

export interface Staff {
  name: Translate;
  position: Translate;
  email: string;
  phone: string;
}

export interface UniversityAdministration {
  id: string;
  unit: Translate;
  introduction: Translate;
  staffTitle?: Translate;
  info: Info[];
  staff: Staff[];
}

export interface UpdateUniversityAdministration {
  id: string;
  change: Partial<UniversityAdministration>;
}
