-- CreateEnum
CREATE TYPE "CollegeType" AS ENUM ('IIT', 'NIT', 'AIIMS', 'OTHER');

-- CreateTable
CREATE TABLE "MapLocation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "type" "CollegeType" NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MapLocation_pkey" PRIMARY KEY ("id")
);
