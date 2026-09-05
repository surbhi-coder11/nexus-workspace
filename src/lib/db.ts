import { PrismaClient } from "@prisma/client";

// This prevents Next.js from creating too many database connections
// during development (Hot Module Replacement)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;