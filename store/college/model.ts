import { Translate } from "@/utils/http.util";

export interface College {
  id: string;
  name: Translate;
  code: string;
  introduction: Translate;
  info: CollegeInfo;
  counter: Counter;
}

export interface UpdateCollege {
  id: string;
  college: Partial<College>;
}

export interface CollegeInfo {
  vision: Translate;
  academicQualification: Translate;
  bachelorProgram: Translate;
  registrationStep: Translate;
  collegeDepartment: Translate[];
}

export interface Counter {
  student: number;
  department: number;
  staff: number;
}
