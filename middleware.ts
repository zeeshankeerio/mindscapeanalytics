import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  
  // Protected routes that require authentication
  const protectedPaths = [
    // '/dashboard', // Dashboard is not protected
    // '/api/dashboard', // Dashboard API is not protected
    '/api/prediction',
    '/api/nlp',
    '/api/vision',
    '/api/assistant',
    '/api/contentforge'
  ]
  
  // Admin-only routes
  const adminPaths = [
    '/admin',
  ]
  
  const path = request.nextUrl.pathname
  
  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(prefix => 
    path === prefix || path.startsWith(`${prefix}/`)
  )
  
  // Check if the path requires admin access
  const isAdminPath = adminPaths.some(prefix =>
    path === prefix || path.startsWith(`${prefix}/`)
  )
  
  // If it's a protected path and user is not authenticated, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL('/auth/login', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }
  
  // If it's an admin path and user is not an admin, redirect to dashboard
  if (isAdminPath && (!token || token.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Handle empty main category paths to redirect to specific pages
  if (path === '/solutions') {
    return NextResponse.redirect(new URL('/solutions/industry', request.url))
  }
  
  if (path === '/resources') {
    return NextResponse.redirect(new URL('/docs', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|assets|public).*)",
  ],
} 