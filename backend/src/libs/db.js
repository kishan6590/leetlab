import { Prisma, PrismaClient } from "../generated/prisma/index.js"; 

const globalForThis = globalThis;

export const db = globalForThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForThis.prisma = db;
    