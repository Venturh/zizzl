import { PrismaClient } from '.prisma/client';

// Prevent multiple instances of Prisma Client in development
declare const global: NodeJS.Global & { prisma?: PrismaClient };

const db = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = db;

export default db;
