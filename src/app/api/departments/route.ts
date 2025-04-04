import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get distinct departments by name
    const departments = await prisma.department.findMany({
      distinct: ['name'],
      orderBy: { name: 'asc' },
      where: {
        NOT: {
          name: 'Computer Science & Engineering (CSE)' // Exclude the duplicate
        }
      }
    });
    
    return NextResponse.json(departments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}