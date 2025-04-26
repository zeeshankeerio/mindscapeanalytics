import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock function to get user from token - replace with real implementation
const getUserFromToken = async (token: string) => {
  // In a real app, you would verify the token and fetch user from database
  if (token && token.startsWith('mock-token-')) {
    return {
      id: '1',
      name: 'Mock User',
      email: 'user@example.com',
      role: 'USER'
    };
  }
  return null;
};

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const user = await getUserFromToken(token);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to authenticate user' },
      { status: 500 }
    );
  }
} 