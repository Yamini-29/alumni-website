import { NextRequest, NextResponse } from "next/server";
import { AnnouncementService } from "@/services/announcement.service";

export async function GET() {
  const announcements =
    await AnnouncementService.getAllAnnouncements();

  return NextResponse.json(announcements);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const announcement =
    await AnnouncementService.createAnnouncement(body);

  return NextResponse.json(announcement);
}