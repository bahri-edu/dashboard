import { Translate } from "@/utils/http.util";

export interface VisionMission {
  id: string;
  title: Translate;
  description: Translate;
  sqNo: number;
  icon: string;
}

export interface UpdateVisionMission {
  id: string;
  news: Partial<VisionMission>;
}
