import {
  NextRequest,
  NextResponse,
} from "next/server";

import { EventService } from "@/services/event.service";

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const body =
    await request.json();

  const { id } =
    await params;

  const event =
    await EventService.updateEvent(
      id,
      body
    );

  return NextResponse.json(event);
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } =
    await params;

  await EventService.deleteEvent(id);

  return NextResponse.json({
    success: true,
  });
}