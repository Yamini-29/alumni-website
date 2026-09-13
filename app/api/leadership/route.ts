import { NextResponse } from "next/server";
import { LeadershipService } from "@/services/leadership.service";

export async function GET() {
  const leaders = await LeadershipService.getVisibleLeaders();

  return NextResponse.json(leaders);
}
