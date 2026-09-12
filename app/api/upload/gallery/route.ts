import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "No file uploaded" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const uploadDirectory = path.join(
    process.cwd(),
    "public",
    "uploads",
    "gallery"
  );
  const uploadPath = path.join(
    uploadDirectory,
    fileName
  );

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(uploadPath, buffer);

  return NextResponse.json({
    imageUrl: `/uploads/gallery/${fileName}`,
  });
}