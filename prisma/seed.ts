import { PrismaClient, AdminRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.admin.findUnique({
    where: {
      username: "principal",
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash("Principal@2026", 12);

  await prisma.admin.create({
    data: {
      username: "principal",
      passwordHash,
      name: "Principal",
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  console.log("✅ Principal account created.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });