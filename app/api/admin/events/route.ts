import { NextRequest, NextResponse } from "next/server";
import { EventService } from "@/services/event.service";

export async function GET() {
  const events =
    await EventService.getAllEvents();

  return NextResponse.json(events);
}

export async function POST(
  request: NextRequest
) {
  const body = await request.json();

  const event =
    await EventService.createEvent(body);

  return NextResponse.json(event);
}