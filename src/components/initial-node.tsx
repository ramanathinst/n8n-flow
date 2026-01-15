import { memo, useState } from "react";
import { WorkflowNode } from "./workflow-node";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { NodeSelector } from "./node-selector";

export const InitialNode = memo((props: NodeProps) => {
    const [selectorOpen, setSelectorOpen] = useState(false);
    return (
        <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
            <WorkflowNode showToolbar={true}>
                <PlaceholderNode
                    onClick={() => setSelectorOpen(true)}
                    {...props}
                >
                    <PlusIcon />
                </PlaceholderNode>
            </WorkflowNode>
        </NodeSelector>
    )
})