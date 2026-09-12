import { NextRequest, NextResponse } from "next/server";
import { MapService } from "@/services/map.service";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const updated =
    await MapService.updateLocation(id, body);

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await MapService.deleteLocation(id);

  return NextResponse.json({
    success: true,
  });
}