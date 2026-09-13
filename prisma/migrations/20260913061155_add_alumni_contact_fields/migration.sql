/*
  Warnings:

  - You are about to drop the column `category` on the `Alumni` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Alumni" DROP COLUMN "category",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "phone" TEXT;
