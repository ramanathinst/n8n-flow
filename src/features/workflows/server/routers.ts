import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { generateSlug } from "random-word-slugs"
import z from "zod";

export const worflowsRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async({ctx}) => {
        return prisma.workflow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.auth.user.id
            }
        })
    }),
    remove: protectedProcedure.input(z.object({ id: z.string() })).mutation(async({ctx, input}) => {
        return prisma.workflow.delete({
            where: {
                userId: ctx.auth.user.id,
                id: input.id
            }
        })
    }),
    updateName: protectedProcedure.input(z.object({ id: z.string(), name: z.string() })).mutation(async({ctx, input}) => {
        return prisma.workflow.update({
            where: {
                userId: ctx.auth.user.id,
                id: input.id
            },
            data: {
                name: input.name
            }
        })
    }),
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async({ctx, input}) => {
        return prisma.workflow.findUniqueOrThrow({
            where: {
                userId: ctx.auth.user.id,
                id: input.id
            }
        })
    }),
    getMany: protectedProcedure.query(async({ctx}) => {
        return prisma.workflow.findMany({
            where: {
                userId: ctx.auth.user.id,
            }
        })
    }),
});