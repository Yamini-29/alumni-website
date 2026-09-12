import { prisma } from "@/lib/prisma";

export class AnnouncementService {

  static async getAllAnnouncements() {
    return prisma.announcement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async createAnnouncement(data: {
    title: string;
    description: string;
    category: string;
    status: "PUBLISHED" | "DRAFT";
    pinned: boolean;
    publishDate: string;
    createdBy: string;
  }) {
    return prisma.announcement.create({
      data,
    });
  }

  static async updateAnnouncement(id: string, data: any) {
    return prisma.announcement.update({
      where: { id },
      data,
    });
  }

  static async deleteAnnouncement(id: string) {
    return prisma.announcement.delete({
      where: { id },
    });
  }

}