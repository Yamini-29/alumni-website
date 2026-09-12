import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section") === "past" ? "past" : "upcoming";
  const pageValue = Number(request.nextUrl.searchParams.get("page"));
  const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const limitValue = Number(request.nextUrl.searchParams.get("limit"));
  const limit = Number.isInteger(limitValue) && limitValue > 0 ? Math.min(limitValue, 24) : 6;
  const where = { status: section === "past" ? "COMPLETED" as const : "UPCOMING" as const };
  const [items, total] = await prisma.$transaction([prisma.event.findMany({ where, orderBy: { date: section === "past" ? "desc" : "asc" }, ...(section === "past" ? { skip: (page - 1) * limit, take: limit } : {}) }), prisma.event.count({ where })]);
  return NextResponse.json({ items, page: section === "past" ? page : 1, limit: section === "past" ? limit : total, total, totalPages: section === "past" ? Math.max(1, Math.ceil(total / limit)) : 1 });
}
