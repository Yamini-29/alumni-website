import { prisma } from "@/lib/prisma";

export class LeadershipService {
  static async getAllLeaders() {
    return prisma.leadership.findMany({
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  static async getVisibleLeaders() {
    return prisma.leadership.findMany({
      where: {
        isVisible: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  static async createLeader(data: {
    name: string;
    designation: string;
    message: string;
    image: string;
    displayOrder: number;
    isVisible: boolean;
  }) {
    return prisma.leadership.create({
      data,
    });
  }

  static async updateLeader(
    id: string,
    data: {
      name: string;
      designation: string;
      message: string;
      image: string;
      displayOrder: number;
      isVisible: boolean;
    }
  ) {
    return prisma.leadership.update({
      where: { id },
      data,
    });
  }

  static async deleteLeader(id: string) {
    return prisma.leadership.delete({
      where: { id },
    });
  }
}