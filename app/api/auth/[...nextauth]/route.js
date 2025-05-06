import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "Auth is disabled in demo mode",
    status: "demo",
  })
}

export async function POST() {
  return NextResponse.json({
    message: "Auth is disabled in demo mode",
    status: "demo",
  })
}
