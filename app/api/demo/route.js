import { NextResponse } from "next/server"

// This is a simple API route for the demo version
// It doesn't use Prisma or any database
export async function GET() {
  return NextResponse.json({
    message: "This is a demo API endpoint",
    status: "success",
    demo: true,
  })
}

export async function POST(request) {
  try {
    const data = await request.json()

    return NextResponse.json({
      message: "Data received successfully in demo mode",
      status: "success",
      demo: true,
      received: data,
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
