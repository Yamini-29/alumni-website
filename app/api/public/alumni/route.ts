import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 48;
function numberParam(value: string | null, fallback: number, max: number) { const parsed = Number(value); return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback; }

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = numberParam(searchParams.get("page"), 1, 100000);
  const limit = numberParam(searchParams.get("limit"), DEFAULT_LIMIT, MAX_LIMIT);
  const query = searchParams.get("q")?.trim() ?? "";
  const batch = searchParams.get("batch")?.trim() ?? "";
  const where = { status: "ACTIVE" as const, ...(batch ? { batch } : {}), ...(query ? { OR: [{ name: { contains: query, mode: "insensitive" as const } }, { company: { contains: query, mode: "insensitive" as const } }, { city: { contains: query, mode: "insensitive" as const } }] } : {}) };
  const [items, total] = await prisma.$transaction([prisma.alumni.findMany({ where, orderBy: { name: "asc" }, skip: (page - 1) * limit, take: limit }), prisma.alumni.count({ where })]);
  return NextResponse.json({ items, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) });
}
