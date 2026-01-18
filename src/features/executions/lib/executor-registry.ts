import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "../types";
import { httpRequestExecutor } from "../components/http-requests/executor";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-triggers/executor";
export const executorRegistry: Record<NodeType, NodeExecutor> = {
    [NodeType.INITIAL]: manualTriggerExecutor,
    [NodeType.HTTP_REQUEST]: httpRequestExecutor,
    [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
} 
export const getExecutor = (type: NodeType): NodeExecutor => {
    const executor = executorRegistry[type]
    if(!executor) {
        throw new Error(`Executor not found for node type ${type}`)
    }
    return executor;
}