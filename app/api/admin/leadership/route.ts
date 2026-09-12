import { NextResponse } from "next/server";
import { LeadershipService } from "@/services/leadership.service";

export async function GET() {
  const leaders = await LeadershipService.getAllLeaders();

  return NextResponse.json(leaders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const leader =
      await LeadershipService.createLeader({
        name: body.name,
        designation: body.designation,
        message: body.message,
        image: body.image,
        displayOrder: body.displayOrder,
        isVisible: body.isVisible,
      });

    return NextResponse.json(leader, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create leader" },
      { status: 500 }
    );
  }
}