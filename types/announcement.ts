export interface Announcement {
  id: number;

  title: string;

  description: string;

  category: string;

  publishDate: string;

  expiryDate: string;

  pinned: boolean;

  status: "Draft" | "Published";
}