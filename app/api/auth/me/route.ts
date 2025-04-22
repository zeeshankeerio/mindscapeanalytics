import { NextRequest, NextResponse } from "next/server"

// Mock user for development
const mockUser = {
  id: "mock-user-id",
  name: "Demo User",
  email: "demo@example.com",
  role: "ADMIN",
  avatar: "/avatars/default.png"
}

export async function GET(request: NextRequest) {
  try {
    // Return mock user without authentication
    return NextResponse.json(
      { user: mockUser },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 