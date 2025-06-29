import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      message: "API is working",
      timestamp: new Date().toISOString(),
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "API test failed" }, { status: 500 });
  }
}
