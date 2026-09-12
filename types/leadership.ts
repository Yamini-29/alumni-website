export interface Leader {
  id: string;

  name: string;
  designation: string;

  message: string;

  image: string;

  displayOrder: number;

  isVisible: boolean;

  createdAt?: string;
  updatedAt?: string;
}