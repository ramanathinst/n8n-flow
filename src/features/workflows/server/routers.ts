import { PAGINATION } from "@/config/constants";
import { NodeType } from "@/generated/prisma/enums";
import prisma from "@/lib/db";
import {
    createTRPCRouter,
    premiumProcedure,
    protectedProcedure,
} from "@/trpc/init";
import { Edge, Node } from "@xyflow/react";
import { generateSlug } from "random-word-slugs";
import z, { number, string } from "zod";

export const workflowsRouter = createTRPCRouter({
    create: premiumProcedure.mutation(async ({ ctx }) => {
        return await prisma.workflow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.auth.user.id,
                nodes: {
                    create: {
                        name: NodeType.INITIAL,
                        position: {x: 0, y: 0},
                        type: NodeType.INITIAL,
                        data: {}
                    }
                }
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
    update: premiumProcedure
    .input(z.object({
        id: string(),
        nodes: z.array(z.object({
            id: z.string(),
            type: z.string().nullish(),
            position: z.object({
                x: z.number(),
                y: z.number()
            }),
            data: z.record(z.string(), z.any()).optional()
        })),
        edges: z.array(z.object({
            source: z.string(),
            target: z.string(),
            sourceHandle: z.string().nullish(),
            targetHandle: z.string().nullish(),
        }))
    }))
    .mutation(async({ctx, input}) => {
        const { id, nodes, edges } = input;
        const workflow = await prisma.workflow.findUniqueOrThrow({
            where: {
                userId: ctx.auth.user.id,
                id
            }
        })

        return await prisma.$transaction(async(tx) => {
            await tx.node.deleteMany({
                where: {
                    workflowId: id
                }
            })

            await tx.node.createMany({
                data: nodes.map((node) => ({
                    id: node.id,
                    workflowId: id,
                    name: node.type as "Unknown",
                    position: node.position as {x: number, y: number},
                    type: node.type as NodeType,
                    data: node.data as Record<string, any> | {}
                }))
            })

            await tx.connection.createMany({
                data: edges.map((edge) => ({
                    workflowId: id,
                    fromNodeId: edge.source,
                    toNodeId: edge.target,
                    fromOutput: edge.sourceHandle || "main",
                    toInput: edge.targetHandle || "main"
                }))
            })

            return workflow;
        })
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
            const workflow = await prisma.workflow.findUniqueOrThrow({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id,
                },
                include: {nodes: true, connections: true}
            });
            const nodes: Node[] = workflow.nodes.map((node) => ({
                id: node.id,
                position: node.position as {x: number, y: number},
                type: node.type,
                data: node.data as Record<string, unknown> | {},
            }))
            const edges: Edge[] = workflow.connections.map((connection) => ({
                id: connection.id,
                source: connection.fromNodeId,
                target: connection.toNodeId,
                sourceHandle: connection.fromOutput,
                targetHandle: connection.toInput
            }))

            return{
                id: workflow.id,
                name: workflow.name,
                nodes,
                edges
            }
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
