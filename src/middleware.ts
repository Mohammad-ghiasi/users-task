import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  const loginUrl = new URL('/login', request.url);

  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(loginUrl); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/users', '/adduser'],
};
