import { Translate } from "@/utils/http.util";

export interface UploadFile {
  id: string;
  title: Translate;
  url: string;
  sqNo: number;
}

export interface UpdateUploadFile {
  id: string;
  change: Partial<UploadFile>;
}
