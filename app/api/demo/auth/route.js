import { NextResponse } from "next/server"

// Simple mock authentication endpoint for demo
export async function GET() {
  return NextResponse.json({
    user: {
      id: "demo-user-1",
      name: "Demo User",
      email: "demo@example.com",
    },
    message: "Demo authentication endpoint",
  })
}

export async function POST() {
  return NextResponse.json({
    success: true,
    user: {
      id: "demo-user-1",
      name: "Demo User",
      email: "demo@example.com",
    },
    message: "Demo login successful",
  })
}
