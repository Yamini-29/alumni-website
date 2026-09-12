import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const data = await request.formData();

  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { message: "No file uploaded" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const uploadPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "events",
    fileName
  );

  await writeFile(uploadPath, buffer);

  return NextResponse.json({
    imageUrl: `/uploads/events/${fileName}`,
  });
}