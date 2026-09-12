import { NextResponse } from "next/server";
import { LeadershipService } from "@/services/leadership.service";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const leader =
    await LeadershipService.updateLeader(id, {
      name: body.name,
      designation: body.designation,
      message: body.message,
      image: body.image,
      displayOrder: body.displayOrder,
      isVisible: body.isVisible,
    });

  return NextResponse.json(leader);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await LeadershipService.deleteLeader(id);

  return NextResponse.json({
    message: "Leader deleted",
  });
}