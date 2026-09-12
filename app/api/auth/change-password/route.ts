import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { AuthService } from "@/services/auth.service";

export async function POST(request: Request) {
  try {
    const admin = await getCurrentAdmin();

    if (!admin) {
      return NextResponse.json(
        { message: "Unauthenticated" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current and new passwords are required" },
        { status: 400 }
      );
    }

    await AuthService.changePassword(
      admin.id,
      currentPassword,
      newPassword
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Password update failed",
      },
      { status: 400 }
    );
  }
}
