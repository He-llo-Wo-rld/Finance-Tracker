import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    return NextResponse.json({
      exists: !!existingUser,
      message: existingUser ? "Email is already in use" : "Email is available",
    });
  } catch (error) {
    console.error("Email check error:", error);
    return NextResponse.json({ error: "Email check error" }, { status: 500 });
  }
}
