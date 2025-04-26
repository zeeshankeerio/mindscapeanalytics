import { NextRequest, NextResponse } from 'next/server'

// In a real application, you would store these metrics in a database
// Here we'll just log them to the console, but you could send them to
// a service like Vercel Analytics, Google Analytics, or your own backend

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, value, pathname, userAgent } = body
    
    if (!name || value === undefined) {
      return NextResponse.json(
        { success: false, message: 'Metric name and value are required' },
        { status: 400 }
      )
    }
    
    // In a real app, you would store these metrics in a database
    console.log('Web Vital:', { 
      id, 
      name, 
      value, 
      pathname: pathname || '/', 
      userAgent: userAgent || 'Unknown',
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json({
      success: true,
      message: 'Web vitals recorded successfully'
    })
  } catch (error) {
    console.error('Web vitals error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to record web vitals' },
      { status: 500 }
    )
  }
} 