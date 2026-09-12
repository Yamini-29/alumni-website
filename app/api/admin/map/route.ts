import { NextRequest, NextResponse } from "next/server";
import { MapService } from "@/services/map.service";

export async function GET() {
  const locations = await MapService.getAllLocations();

  return NextResponse.json(locations);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const location =
    await MapService.createLocation(body);

  return NextResponse.json(location);
}