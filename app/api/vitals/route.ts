import { NextResponse } from 'next/server'

// In a real application, you would store these metrics in a database
// Here we'll just log them to the console, but you could send them to
// a service like Vercel Analytics, Google Analytics, or your own backend

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Log the vitals to the console
    console.log('[Web Vitals]', JSON.stringify(body, null, 2))
    
    // In a real app, you would store these in a database or analytics platform
    // For example, with Prisma:
    // await prisma.webVital.create({ data: { ...body } })
    
    return NextResponse.json({ message: 'Web vitals received', success: true })
  } catch (error) {
    console.error('Error processing web vitals:', error)
    return NextResponse.json(
      { message: 'Error processing web vitals' },
      { status: 500 }
    )
  }
} 