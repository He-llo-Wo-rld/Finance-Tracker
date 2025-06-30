import { NextResponse } from "next/server";

export async function GET() {
  // Remove sensitive data before logging
  const envCheck = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "SET" : "NOT SET",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "SET" : "NOT SET",
    MONGODB_URI: process.env.MONGODB_URI ? "SET" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
  };

  console.log("Environment variables check:", envCheck);

  return NextResponse.json(envCheck);
}
