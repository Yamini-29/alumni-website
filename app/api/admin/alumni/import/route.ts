import { NextRequest, NextResponse } from "next/server";
import { AlumniService } from "@/services/alumni.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await AlumniService.importAlumni(body.alumni);

    return NextResponse.json({
      message: "Import successful",
      imported: result.count,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Import failed" },
      { status: 500 }
    );
  }
}