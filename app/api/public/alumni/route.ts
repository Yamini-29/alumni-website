import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 48;
function numberParam(value: string | null, fallback: number, max: number) { const parsed = Number(value); return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback; }

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = numberParam(searchParams.get("page"), 1, 100000);
  const limit = numberParam(searchParams.get("limit"), DEFAULT_LIMIT, MAX_LIMIT);
  const q = searchParams.get("q")?.trim() ?? "";
  const batch = searchParams.get("batch")?.trim() ?? "";
  const city = searchParams.get("city")?.trim() ?? "";
  const where = {
    status: "ACTIVE" as const,
    ...(q && {
      OR: [
        { name: { contains: q, mode: "insensitive" as const } },
        { company: { contains: q, mode: "insensitive" as const } },
        { college: { contains: q, mode: "insensitive" as const } },
      ],
    }),
    ...(batch && { batch }),
    ...(city && {
      city: {
        contains: city,
        mode: "insensitive" as const,
      },
    }),
  };
  const [items, total] = await prisma.$transaction([
    prisma.alumni.findMany({
      where,
      select: {
        id: true,
        name: true,
        batch: true,
        college: true,
        company: true,
        city: true,
        linkedin: true,
      },
      orderBy: { name: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.alumni.count({ where }),
  ]);
  return NextResponse.json({ items, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) });
}
