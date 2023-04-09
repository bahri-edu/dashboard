import { Translate } from "@/utils/http.util";

export interface Social {
  icon: string;
  url: string;
}

export interface Staff {
  id: string;
  possison: Translate;
  name: Translate;
  awardsAndgrants: Translate[];
  educationAndExperience: Translate[];
  internationalConferencesAndCourses: Translate[];
  workshops: Translate[];
  qualifications: Translate[];
  socials: Social[];
  phone: string;
  email: string;
  collegeId: string;
}

export interface UpdateStaff {
  id: string;
  change: Partial<Staff>;
}
