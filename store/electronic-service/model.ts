export interface EService {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  seqNo: number;
}

export interface UpdateEService {
  id: string;
  change: Partial<EService>;
}
