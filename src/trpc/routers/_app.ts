import { z } from 'zod';
import { baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { worflowsRouter } from '@/features/workflows/server/routers';
export const appRouter = createTRPCRouter({
    workflows: worflowsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;