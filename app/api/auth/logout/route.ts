import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Create response with success status
    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 