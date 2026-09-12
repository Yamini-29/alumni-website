import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ folderId: string }> }
) {
  const { folderId } = await params;
  const folder = await prisma.galleryFolder.findUnique({
    where: { id: folderId },
    include: { images: { orderBy: { createdAt: "desc" } } },
  });

  if (!folder) {
    return NextResponse.json({ error: "Gallery folder not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: folder.id,
    eventName: folder.eventName,
    eventDate: folder.eventDate,
    coverImage: folder.coverImage,
    description: "",
    photos: folder.images.map((image) => ({
      id: image.id,
      url: image.imageUrl,
    })),
  });
}