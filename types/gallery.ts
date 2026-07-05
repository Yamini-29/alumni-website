export interface GalleryPhoto {
  id: string;
  url: string;
  uploadedDate: string; // ISO date string
}

export interface GalleryFolder {
  id: string;
  eventName: string;
  eventDate: string;    // date the event actually happened
  createdDate: string;  // date the folder was created in admin
  description: string;
  coverImage: string;   // explicit cover image, separate from photos[]
  photos: GalleryPhoto[];
}