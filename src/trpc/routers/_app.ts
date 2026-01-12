import { z } from 'zod';
import {createTRPCRouter, } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { workflowsRouter } from '@/features/workflows/server/routers';
export const appRouter = createTRPCRouter({
    workflows: workflowsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;