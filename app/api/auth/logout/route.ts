import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SessionService } from "@/services/session.service";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (token) {
    await SessionService.deleteSession(token);
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("admin_session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}