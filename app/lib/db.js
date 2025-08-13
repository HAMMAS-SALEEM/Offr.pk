import { PrismaClient } from '../generated/prisma/index';

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
