export type CollegeType =
  | "IIT"
  | "NIT"
  | "AIIMS"
  | "OTHER";

export interface MapLocation {
  id: string;

  name: string;
  college: string;

  city: string;

  type: CollegeType;

  latitude: number;
  longitude: number;

  createdAt?: string;
  updatedAt?: string;
}