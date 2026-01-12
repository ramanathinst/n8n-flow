import prisma from "@/lib/db";
import {
    createTRPCRouter,
    premiumProcedure,
    protectedProcedure,
} from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import z from "zod";

export const workflowsRouter = createTRPCRouter({
    create: premiumProcedure.mutation(async ({ ctx }) => {
        return await prisma.workflow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.auth.user.id,
            },
        });
    }),
    remove: premiumProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await prisma.workflow.delete({
                where: {
                    userId: ctx.auth.user.id,
                    id: input.id,
                },
            });
        }),
    updateName: premiumProcedure
        .input(z.object({ id: z.string(), name: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await prisma.workflow.update({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id,
                },
                data: {
                    name: input.name,
                },
            });
        }),
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await prisma.workflow.findUniqueOrThrow({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id,
                },
            });
        }),
    getMany: protectedProcedure.query(async ({ ctx }) => {
            return await prisma.workflow.findMany({
                where: {
                    userId: ctx.auth.user.id,
                },
            });
        }),
});
