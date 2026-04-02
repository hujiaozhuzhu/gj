import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simulated user database
const USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' }
]

// Middleware function - VULNERABLE TO CVE-2025-29927
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedPaths = ['/admin', '/api/admin', '/api/config', '/dashboard']

  // Check if path requires authentication
  if (protectedPaths.some(path => pathname.startsWith(path))) {

    // ⚠️ VULNERABILITY: Next.js doesn't properly validate
    // the 'x-middleware-subrequest' header
    // Attackers can add this header to bypass authentication

    const isSubrequest = request.headers.get('x-middleware-subrequest')

    if (isSubrequest === '1') {
      // Vulnerable: Treats request as internal trusted request
      // Bypasses authentication checks!
      return NextResponse.next()
    }

    // Check for authentication token in cookies
    const token = request.cookies.get('auth-token')

    if (!token || token.value !== 'valid-auth-token') {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/config',
    '/dashboard/:path*'
  ]
}
