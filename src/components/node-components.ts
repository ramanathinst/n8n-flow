import { NodeType } from "@/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";
import { InitialNode } from "./initial-node";
import { ManualTriggersNode } from "@/features/triggers/components/manual-triggers/node";
import { HttpRequsetsNode } from "@/features/executions/components/http-requests/node";

export const nodeComponents = {
    [NodeType.INITIAL]: InitialNode,
    [NodeType.MANUAL_TRIGGER]: ManualTriggersNode,
    [NodeType.HTTP_REQUEST]: HttpRequsetsNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;