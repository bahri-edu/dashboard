import { Translate } from "@/utils/http.util";

interface Social {
  icon: string;
  url: string;
}

export interface Contact {
  id: string;
  location: Translate;
  phone: string[];
  email: string;
  fax: string;
  socials: Social[];
}

export interface UpdateContact {
  id: string;
  change: Partial<Contact>;
}
