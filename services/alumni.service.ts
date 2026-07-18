import { prisma } from "@/lib/prisma";

export class AlumniService {

  static async createAlumni(data: {
    name: string;
    batch: string;
    college: string;
    company: string;
    city: string;
    status: "ACTIVE" | "HIDDEN";
  }) {

    return prisma.alumni.create({
      data,
    });

  }

  static async getAllAlumni() {

    return prisma.alumni.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  }

}