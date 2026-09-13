import bcrypt from "bcrypt";
import { PrismaClient, AdminRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const username = "principal";
  const password = "Principal@123";

  const existing = await prisma.admin.findUnique({
    where: { username },
  });

  if (existing) {
    console.log("Admin already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.create({
    data: {
      username,
      passwordHash,
      name: "Principal",
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  console.log("✅ Principal account created");
  console.log("Username:", username);
  console.log("Password:", password);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());