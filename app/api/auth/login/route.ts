import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AuthService } from "@/services/auth.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        {
          message: "Username and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const session = await AuthService.login(username, password);

    const cookieStore = await cookies();

    cookieStore.set("admin_session", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      {
        status: 401,
      }
    );
  }
}