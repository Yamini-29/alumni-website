export interface Announcement {
  id: string;

  title: string;

  description: string;

  category: string;

  publishDate: string;

  pinned: boolean;

  status: "DRAFT" | "PUBLISHED";

  createdBy: string;
}