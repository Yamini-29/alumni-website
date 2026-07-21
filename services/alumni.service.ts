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
  static async importAlumni(alumni: {
  name: string;
  batch: string;
  college: string;
  company: string;
  city: string;
  status: "ACTIVE" | "HIDDEN";
}[]) {

  return prisma.alumni.createMany({
    data: alumni,
  });

}

static async updateAlumni(
  id: string,
  data: {
    name?: string;
    batch?: string;
    college?: string;
    company?: string;
    city?: string;
    status?: "ACTIVE" | "HIDDEN";
  }
) {

  return prisma.alumni.update({
    where: { id },
    data,
  });

}

static async deleteAlumni(id: string) {

  return prisma.alumni.delete({
    where: { id },
  });

}

}
