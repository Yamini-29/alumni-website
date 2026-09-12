import { NextResponse } from "next/server";
import { MapService } from "@/services/map.service";

export async function GET() {
  try {
    const locations = await MapService.getAllLocations();
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Public map query failed", error);
    return NextResponse.json(
      {
        error: "Unable to load map locations",
        detail: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  }
}