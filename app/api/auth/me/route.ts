import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    admin: {
      username: admin.username,
      name: admin.name,
      role: admin.role,
      lastLogin: admin.updatedAt,
    },
  });
}