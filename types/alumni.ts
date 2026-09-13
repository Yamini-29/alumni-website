export interface Alumni {
  id: string;
  name: string;
  batch: string;
  college: string;
  company: string;
  city: string;
  linkedin?: string;
  phone?: string;
  address?: string;
  category?: string;
  employmentStatus?: string;
  status: "ACTIVE" | "HIDDEN";
}
