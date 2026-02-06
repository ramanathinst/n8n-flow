import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
    aiExecute: baseProcedure.mutation(async() => {
        await inngest.send({
            name: "ai/execute",
            data: {
                email: "Ramanathinst@gmail.com"
            }
        })
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;