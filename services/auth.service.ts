import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { SessionService } from "./session.service";

export class AuthService {
  static async login(username: string, password: string) {
    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
    });

    if (!admin) {
      throw new Error("Invalid username or password");
    }

    if (!admin.isActive) {
      throw new Error("Account is disabled");
    }

    const validPassword = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!validPassword) {
      throw new Error("Invalid username or password");
    }

    return SessionService.createSession(admin.id);
  }

  static async changePassword(
    adminId: string,
    newPassword: string
  ) {
    const hash = await bcrypt.hash(newPassword, 12);

    return prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        passwordHash: hash,
      },
    });
  }

  static async findAdmin(adminId: string) {
    return prisma.admin.findUnique({
      where: {
        id: adminId,
      },
    });
  }
}