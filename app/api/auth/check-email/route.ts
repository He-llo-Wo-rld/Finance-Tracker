import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email є обов'язковим" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    return NextResponse.json({
      exists: !!existingUser,
      message: existingUser ? "Email вже використовується" : "Email доступний",
    });
  } catch (error) {
    console.error("Email check error:", error);
    return NextResponse.json(
      { error: "Помилка перевірки email" },
      { status: 500 }
    );
  }
}
