export interface Event {
  id?: number;
  title: string;
  description: string;
  venue?: string;
  category?: string;
  date: string;
  time?: string;
  registrationLink?: string;
  banner?: string;
  image?: string;
  status?: "Upcoming" | "Completed" | "Cancelled";
  featured?: boolean;
  createdBy?: string;
}
