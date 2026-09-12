import { NextRequest, NextResponse } from "next/server";
import { AnnouncementService } from "@/services/announcement.service";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();

  const { id } = await params;

  const announcement =
    await AnnouncementService.updateAnnouncement(id, body);

  return NextResponse.json(announcement);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await AnnouncementService.deleteAnnouncement(id);

  return NextResponse.json({
    success: true,
  });
}