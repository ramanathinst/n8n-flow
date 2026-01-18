import { GetStepTools, Inngest } from "inngest";

export type StepTools = GetStepTools<Inngest.Any>;
export type WorkflowContect = Record<string, unknown>;

export interface NodeExecutorParams<TData = Record<string, unknown>> {
    nodeId: string;
    data: TData;
    context: WorkflowContect;
    step: StepTools
}
export type NodeExecutor<TData = Record<string, unknown>> = (
    parama: NodeExecutorParams<TData>
) => Promise<WorkflowContect>