import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock user validation - replace with actual database logic in production
const validateUser = async (email: string, password: string) => {
  // This is a mock - in a real app, you would verify against your database
  if (email === 'admin@example.com' && password === 'password123') {
    return {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'ADMIN'
    };
  }
  return null;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await validateUser(email, password);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // In a real app, you would generate a JWT token here
    const token = `mock-token-${Date.now()}`;
    const refreshToken = `mock-refresh-token-${Date.now()}`;

    // Set cookies
    const cookieStore = cookies();
    cookieStore.set('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 // 1 hour
    });
    
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    // User info to return to client (excluding sensitive info)
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userInfo
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to login' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Login endpoint requires a POST request' },
    { status: 405 }
  );
} 