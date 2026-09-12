import { prisma } from "@/lib/prisma";

export class MapService {
  static async getAllLocations() {
    return prisma.mapLocation.findMany({
      orderBy: {
        college: "asc",
      },
    });
  }

  static async createLocation(data: {
    name: string;
    college: string;
    city: string;
    type: "IIT" | "NIT" | "AIIMS" | "OTHER";
    latitude: number;
    longitude: number;
  }) {
    return prisma.mapLocation.create({
      data,
    });
  }

  static async updateLocation(
    id: string,
    data: {
      name: string;
      college: string;
      city: string;
      type: "IIT" | "NIT" | "AIIMS" | "OTHER";
      latitude: number;
      longitude: number;
    }
  ) {
    return prisma.mapLocation.update({
      where: { id },
      data,
    });
  }

  static async deleteLocation(id: string) {
    return prisma.mapLocation.delete({
      where: { id },
    });
  }
}