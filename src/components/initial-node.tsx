import { memo } from "react";
import { WorkflowNode } from "./workflow-node";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";

export const InitialNode = memo((props: NodeProps) => {
    return(
        <WorkflowNode showToolbar={true}>
            <PlaceholderNode
                {...props}
            >
                <PlusIcon />
            </PlaceholderNode>
        </WorkflowNode>
    )
})