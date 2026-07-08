import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

export class SessionService {
  static async createSession(adminId: string) {
    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    return prisma.session.create({
      data: {
        token,
        adminId,
        expiresAt,
      },
    });
  }

  static async validateSession(token: string) {
    const session = await prisma.session.findUnique({
      where: {
        token,
      },
      include: {
        admin: true,
      },
    });

    if (!session) {
      return null;
    }

    if (session.expiresAt < new Date()) {
      await prisma.session.delete({
        where: {
          id: session.id,
        },
      });

      return null;
    }

    return {
    isValid: true,
    admin: session.admin,
    session
};
  }

  static async extendSession(sessionId: string) {
    return prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        expiresAt: new Date(Date.now() + SESSION_DURATION),
        lastUsedAt: new Date(),
      },
    });
  }

  static async deleteSession(token: string) {
    await prisma.session.deleteMany({
      where: {
        token,
      },
    });
  }
}