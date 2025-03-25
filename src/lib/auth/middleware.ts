// /src/lib/auth/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserData } from '../storage';

export function authMiddleware(req: NextRequest) {
  // Get the path
  const path = req.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/forgot-password'];
  
  // Check if the requested path is public
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next();
  }
  
  // Check if user is authenticated
  const userData = getUserData();
  if (!userData) {
    // Redirect to login page if not authenticated
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}