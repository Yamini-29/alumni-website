import { prisma } from "@/lib/prisma";

export class EventService {

  static async getAllEvents() {
    return prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async createEvent(data: {
    title: string;
    description: string;
    category: string;
    venue: string;
    date: string;
    time: string;
    banner: string;
    featured: boolean;
    status: "UPCOMING" | "COMPLETED" | "CANCELLED";
  }) {
    return prisma.event.create({
      data,
    });
  }

  static async updateEvent(
    id: string,
    data: any
  ) {
    return prisma.event.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteEvent(id: string) {
    return prisma.event.delete({
      where: {
        id,
      },
    });
  }

}