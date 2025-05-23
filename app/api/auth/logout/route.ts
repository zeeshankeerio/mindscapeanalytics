import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Explicitly mark this route as dynamic since it uses cookies
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const cookieStore = cookies();
    
    // Clear auth cookies
    cookieStore.delete('token');
    cookieStore.delete('refreshToken');
    cookieStore.delete('user');
    
    return NextResponse.json({ success: true, message: 'Successfully logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to logout' },
      { status: 500 }
    );
  }
} 