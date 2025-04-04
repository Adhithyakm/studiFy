// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Type-safe global prisma client
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? 
      ['query', 'error', 'warn'] : 
      ['error']
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;
declare global {
  var prisma: PrismaClient | undefined
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();



if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
export default prisma;
// Optional: Add middleware for logging or other purposes
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  
  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
});