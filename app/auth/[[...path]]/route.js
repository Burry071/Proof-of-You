import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.redirect(new URL("/", process.env.VERCEL_URL || "http://localhost:3000"))
}
