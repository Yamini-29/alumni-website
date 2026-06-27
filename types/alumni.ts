export interface Alumni {
  id: number;
  name: string;
  batch: number;
  college: string;
  degree: string;
  company: string;
  city: string;
  linkedin: string;
  category: string;
  phonenumber: number;
  email: string;
  status: "Active" | "Inactive";
  employmentStatus: "Employed" | "Unemployed" | "Student";
}