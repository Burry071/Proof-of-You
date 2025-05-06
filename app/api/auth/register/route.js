import { NextResponse } from "next/server"

// This is a mock registration route for the demo version
// It doesn't use Prisma or any database
export async function POST(request) {
  try {
    const data = await request.json()

    return NextResponse.json({
      success: true,
      message: "User registration simulated in demo mode",
      demo: true,
      user: {
        id: "demo-user-1",
        name: data.name || "Demo User",
        email: data.email || "demo@example.com",
        role: "user",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred processing your request",
        demo: true,
      },
      { status: 500 },
    )
  }
}
