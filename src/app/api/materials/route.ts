import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get('subjectId');
  
  if (!subjectId) {
    return NextResponse.json([]);
  }

  const materials = await prisma.studyMaterial.findMany({
    where: { subjectId: Number(subjectId) },
    include: { resourceType: true },
    orderBy: [
      { resourceType: { name: 'asc' } }, // First sort by resource type
      { moduleNumber: 'asc' }            // Then sort by module number
    ]
  });
  
  const formattedMaterials = materials.map(material => ({
    id: material.id,
    title: material.title,
    description: material.description,
    file_url: material.fileUrl, // Make sure this matches your Prisma model
    resource_type: material.resourceType.name,
    module_number: material.moduleNumber // Make sure this matches your Prisma model
  }));
  
  return NextResponse.json(formattedMaterials);
}