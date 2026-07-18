import { NextRequest, NextResponse } from "next/server";
import { AlumniService } from "@/services/alumni.service";

export async function POST(request: NextRequest) {

  try {

    const body = await request.json();

    const alumni = await AlumniService.createAlumni({
      name: body.name,
      batch: body.batch,
      college: body.college,
      company: body.company,
      city: body.city,
      status: body.status.toUpperCase(),
    });

    return NextResponse.json(
      alumni,
      { status: 201 }
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create alumni",
      },
      {
        status: 500,
      }
    );

  }

}

export async function GET() {

  const alumni = await AlumniService.getAllAlumni();

  return NextResponse.json(alumni);

}