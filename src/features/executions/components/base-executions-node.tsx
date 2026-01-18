import { BaseHandle } from "@/components/react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { NodeStatusIndicator, type NodeStatus } from "@/components/react-flow/node-status-indicator";
import { WorkflowNode } from "@/components/workflow-node";
import { Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

interface BaseExecutionsNodeProps extends NodeProps {
    icon: LucideIcon | string;
    name: string;
    description?: string;
    onDoubleClick?: () => void;
    onDelete?: () => void;
    onSettings?: () => void;
    children?: React.ReactNode;
    status?: NodeStatus;
}

export const BaseExecutionsNode = memo(({
    id,
    icon: Icon,
    name,
    description,
    onDoubleClick,
    onSettings,
    children,
    status
}: BaseExecutionsNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();
        const handleDelete = () => {
            setNodes((nodes) => {
                const updatedNodes = nodes.filter((node) => node.id !== id);
                return updatedNodes;
            })
            setEdges((edges) => {
                const updatedEdges = edges.filter((edge) => edge.source !== id && edge.target !== id);
                return updatedEdges;
            })
        }
    return (
        <WorkflowNode
            name={name}
            description={description}
            onSettings={onSettings}
            onDelete={handleDelete}
        >
            <NodeStatusIndicator status={status}>
                <BaseNode
                    onDoubleClick={onDoubleClick}
                    status={status}
                >
                    <BaseNodeContent className="p-7">
                        {typeof Icon === "string" ? (
                            <Image src={Icon} alt="base-trigger-node" width={20} height={20} />
                        ) : (
                            <Icon className="size-4" />
                        )}
                        {children}
                        <BaseHandle
                            id="source-1"
                            type="source"
                            position={Position.Right}
                        />
                        <BaseHandle
                            id="target-1"
                            type="target"
                            position={Position.Left}
                        />
                    </BaseNodeContent>
                </BaseNode>
            </NodeStatusIndicator>
        </WorkflowNode>
    )
})