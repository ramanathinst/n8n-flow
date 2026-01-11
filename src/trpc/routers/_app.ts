import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
export const appRouter = createTRPCRouter({
    getUsers: protectedProcedure.query(async() => {
        return await prisma.user.findMany({
        })
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;