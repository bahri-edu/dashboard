export interface VisionMission {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  sqNo: number;
  icon: string;
}

export interface UpdateVisionMission {
  id: string;
  news: Partial<VisionMission>;
}
