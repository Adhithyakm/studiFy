import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const semesterId = searchParams.get('semesterId');
  
  if (!semesterId) {
    return NextResponse.json([]);
  }

  const subjects = await prisma.subject.findMany({
    where: { semesterId: Number(semesterId) },
    orderBy: { name: 'asc' }
  });
  return NextResponse.json(subjects);
}