import { inngest } from "./client";
import { NonRetriableError } from "inngest";
import prisma from "@/lib/db";
import { topologicalSort } from "@/features/executions/lib/utils";
import { getExecutor } from "@/features/executions/lib/executor-registry";
import { NodeType } from "@/generated/prisma/enums";
import { httpReqeustChannel } from "./channels/http-request";

export const executeWorkflow = inngest.createFunction(
    {
        id: "workflows-execute.workflow",
        retries: 0, // REMOVE IN PRODUCTION
    },
    { event: "workflows/execute.workflow" ,
        channels: [
            httpReqeustChannel(),
        ]
    },
    async ({ event, step, publish }) => {
        const workflowId = event.data.workflowId;
        if (!workflowId) {
            throw new NonRetriableError("Workflow ID is missing!");
        }

        const sortedNodes = await step.run("prepare-workflows", async () => {
            const workflow = await prisma.workflow.findUniqueOrThrow({
                where: {
                    id: workflowId,
                },
                include: { nodes: true, connections: true },
            });
            return topologicalSort(workflow.nodes, workflow.connections);
        });
        // Initialize contect with any initial data from the trigger.
        let context = event.data.initialData || {};
        for (const node of sortedNodes) {
            const executor = getExecutor(node.type as NodeType);
            context = await executor({
                data: node.data as Record<string, unknown>,
                nodeId: node.id,
                context,
                step,
                publish,
            });
        }
        return {
            workflowId,
            result: context,
        };
    },
);
