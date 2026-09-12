import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const pageValue = Number(request.nextUrl.searchParams.get("page"));
  const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const limitValue = Number(request.nextUrl.searchParams.get("limit"));
  const limit = Number.isInteger(limitValue) && limitValue > 0 ? Math.min(limitValue, 24) : 8;
  const where = { status: "PUBLISHED" as const };
  const [items, total] = await prisma.$transaction([prisma.announcement.findMany({ where, orderBy: [{ pinned: "desc" }, { publishDate: "desc" }], skip: (page - 1) * limit, take: limit }), prisma.announcement.count({ where })]);
  return NextResponse.json({ items, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) });
}
