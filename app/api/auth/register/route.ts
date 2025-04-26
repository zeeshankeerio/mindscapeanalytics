import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

// Mock user for development
const mockUser = {
  id: "mock-user-id",
  name: "Demo User",
  email: "demo@example.com",
  role: "ADMIN"
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // In a real app, you would save the user to your database
    // For now, we'll just mock a successful registration
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'USER',
      createdAt: new Date().toISOString()
    };

    // Mock token generation - in a real app, you'd use JWT or similar
    const token = `mock-token-${Date.now()}`;
    
    // Set auth cookie
    const cookieStore = cookies();
    cookieStore.set('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 // 1 hour
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: newUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to register user' },
      { status: 500 }
    );
  }
} 