// src/app/api/signin/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { z } from 'zod'  // Add this import

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = loginSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      )
    }
    
    const { email, password } = validation.data
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    })
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret', // Provide fallback for development
      { expiresIn: '7d' }
    )
    
    // Set HTTP-only cookie
    ;(await
      // Set HTTP-only cookie
      cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    // Return user data without password and include the token in the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userData } = user
    return NextResponse.json({ 
      user: userData,
      token: token // Include token in response for client-side storage
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}