import { NextResponse } from "next/server";
import { MapService } from "@/services/map.service";

export async function GET() {
  const locations = await MapService.getAllLocations();

  return NextResponse.json(locations);
}