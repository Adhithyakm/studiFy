import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { z } from 'zod';

const profileSchema = z.object({
  department: z.string().optional(),
  semester: z.number().min(1).max(10).optional().nullable(),
  skills: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  score: z.number().optional().nullable(),
  yearOfPassout: z.number().min(2000).max(2030).optional().nullable()
});

// GET Handler
export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { profile: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password, ...userData } = user;
    return NextResponse.json(userData);
    
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

// PUT Handler
export async function PUT(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const validation = profileSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const updatedProfile = await prisma.profile.upsert({
      where: { userId: decoded.userId },
      update: {
        department: body.department,
        semester: body.semester,
        skills: body.skills,
        achievements: body.achievements,
        score: body.score,
        yearOfPassout: body.yearOfPassout
      },
      create: {
        userId: decoded.userId,
        ...body
      }
    });

    return NextResponse.json(updatedProfile);

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}