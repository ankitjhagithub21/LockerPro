import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

// Helper: Check if token exists and is valid
function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get('token')?.value

  if (!token) return false

  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch (err) {
    return false
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAuth = isAuthenticated(req)

  const protectedRoutes = ['/profile']
  const authPages = ['/login', '/signup']

  // ⛔ Unauthenticated users trying to access protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuth) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // ✅ Authenticated users visiting login/signup – redirect them
  if (authPages.includes(pathname) && isAuth) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)', // Exclude API and static files
  ],
}
