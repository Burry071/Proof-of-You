import { NextResponse } from "next/server"

// Simple mock data endpoint for demo
export async function GET() {
  return NextResponse.json({
    verifications: [
      {
        id: "v1",
        type: "Identity",
        status: "Verified",
        date: "2023-04-10T10:30:00Z",
      },
      {
        id: "v2",
        type: "Education",
        status: "Pending",
        date: "2023-04-15T14:20:00Z",
      },
    ],
    message: "Demo data endpoint",
  })
}
