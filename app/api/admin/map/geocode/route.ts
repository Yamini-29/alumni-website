import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { college, city } = await req.json();

  const query = encodeURIComponent(`${college}, ${city}, India`);

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
    {
      headers: {
        "User-Agent": "Thamarai-Alumni-Portal/1.0",
      },
    }
  );

  const data = await response.json();

  if (data.length === 0) {
    return NextResponse.json(
      { message: "Location not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    latitude: Number(data[0].lat),
    longitude: Number(data[0].lon),
  });
}