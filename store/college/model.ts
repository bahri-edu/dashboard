export interface College {
  id: string;
  nameAr: string;
  nameEn: string;
  code: string;
  location?: string;
}

export interface UpdateCollege {
  id: string;
  college: Partial<College>;
}
