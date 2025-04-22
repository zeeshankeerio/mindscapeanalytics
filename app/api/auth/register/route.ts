import { NextRequest, NextResponse } from "next/server";

// Mock user for development
const mockUser = {
  id: "mock-user-id",
  name: "Demo User",
  email: "demo@example.com",
  role: "ADMIN"
};

export async function POST(request: NextRequest) {
  try {
    // Return success without actual registration
    return NextResponse.json(
      { 
        user: mockUser,
        success: true
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 