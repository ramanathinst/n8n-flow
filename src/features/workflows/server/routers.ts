import { PAGINATION } from "@/config/constants";
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
    getMany: protectedProcedure
    .input(z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default("").optional()
    }))
    .query(async ({ ctx, input }) => {
            const { page, pageSize, search } = input;

            const [ items, totalCount ] = await Promise.all([
                await prisma.workflow.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    where: {
                        userId: ctx.auth.user.id,
                        name: {
                            contains: search
                        }
                    },
                    orderBy: {
                        updatedAt: "desc"
                    }
                }),
                await prisma.workflow.count({
                    where: {
                        userId: ctx.auth.user.id,
                        name: {
                            contains: search
                        }
                    }
                })
            ])

            const totalPages = Math.ceil( totalCount / pageSize);
            const hasNextPage = page < totalPages;
            const hasPrePage = page > 1;
            
            return {
                items,
                page,
                pageSize,
                totalPages,
                hasNextPage,
                hasPrePage
            }
        }),
});
