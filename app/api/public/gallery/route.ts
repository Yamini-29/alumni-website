import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const pageValue = Number(request.nextUrl.searchParams.get("page"));
  const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const limitValue = Number(request.nextUrl.searchParams.get("limit"));
  const limit = Number.isInteger(limitValue) && limitValue > 0 ? Math.min(limitValue, 24) : 9;
  const [items, total] = await prisma.$transaction([prisma.galleryFolder.findMany({ include: { photos: { orderBy: { createdAt: "desc" } } }, orderBy: { eventDate: "desc" }, skip: (page - 1) * limit, take: limit }), prisma.galleryFolder.count()]);
  return NextResponse.json({ items, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) });
}
