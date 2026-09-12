import { NextRequest, NextResponse } from "next/server";
import { GalleryService } from "@/services/gallery.service";

export async function GET() {
  const folders =
    await GalleryService.getAllFolders();

  return NextResponse.json(folders);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const folder =
    await GalleryService.createFolder(body);

  return NextResponse.json(folder);
}