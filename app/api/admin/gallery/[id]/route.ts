import { NextRequest, NextResponse } from "next/server";
import { GalleryService } from "@/services/gallery.service";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();

  const { id } = await params;

  const folder =
    await GalleryService.updateFolder(id, body);

  return NextResponse.json(folder);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await GalleryService.deleteFolder(id);

  return NextResponse.json({
    success: true,
  });
}