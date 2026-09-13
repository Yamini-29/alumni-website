import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "No file" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const url = await new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "tis-alumni/events",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result?.secure_url) {
            reject(new Error("Cloudinary returned no secure URL"));
            return;
          }

          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });

  return NextResponse.json({ url });
}
