import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get('departmentId');
    
    if (!departmentId) return NextResponse.json([]);

    const semesters = await prisma.semester.findMany({
      where: { 
        departmentId: Number(departmentId),
        number: { gte: 3, lte: 6 }
      },
      orderBy: { number: 'asc' }
    });
    return NextResponse.json(semesters);
  } catch (error) {
    console.error('Error fetching semesters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch semesters' },
      { status: 500 }
    );
  }
}