import { NextResponse } from "next/server"

// This is a mock NextAuth route for the demo version
// It doesn't use Prisma or any database
export async function GET(request) {
  return NextResponse.json({
    message: "This is a demo authentication endpoint",
    status: "success",
    demo: true,
    user: {
      id: "demo-user-1",
      name: "Demo User",
      email: "demo@example.com",
      role: "user",
    },
  })
}

export async function POST(request) {
  return NextResponse.json({
    message: "Authentication request received in demo mode",
    status: "success",
    demo: true,
    user: {
      id: "demo-user-1",
      name: "Demo User",
      email: "demo@example.com",
      role: "user",
    },
  })
}
