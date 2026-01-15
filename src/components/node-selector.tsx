"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { NodeType } from "@/generated/prisma/enums";
import { useReactFlow } from "@xyflow/react";
import { GlobeIcon, LucideIcon, MousePointerIcon } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { toast } from "sonner";
import { createId } from "@paralleldrive/cuid2"

type NodeTypeOptions = {
    icon: LucideIcon | string;
    label: string;
    description?: string;
    type: NodeType;
}

const triggerNodes: NodeTypeOptions[] = [
    {
        icon: MousePointerIcon,
        label: "Manual Trigger",
        description: "Runs the flow on clicking a button. Good for getting starts quickly",
        type: NodeType.MANUAL_TRIGGER
    }
]

const executionNodes: NodeTypeOptions[] = [
    {
        icon: GlobeIcon,
        label: "Http Request",
        description: "Make an Http Request",
        type: NodeType.HTTP_REQUEST
    }
]

interface NodeSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children?: React.ReactNode;
}
export const NodeSelector = ({
    open,
    onOpenChange,
    children
}: NodeSelectorProps) => {
    const { getNodes, setNodes, screenToFlowPosition } = useReactFlow();
    const handleNodeSelector = useCallback((selection: NodeTypeOptions) => {
            if(selection.type === NodeType.MANUAL_TRIGGER) {
                const nodes = getNodes();
                const hasManulTriggers = nodes.some((node) => node.type === NodeType.MANUAL_TRIGGER);
                if(hasManulTriggers) {
                    toast.error("Only one manual trigger is allowed for per workflow.");
                    return;
                }
            }

            setNodes((nodes) => {
                const hasInitialsNode = nodes.some((node) => node.type === NodeType.INITIAL);

                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                const flowPosition = screenToFlowPosition({
                    x: centerX + (Math.random() - 0.5) * 200,
                    y: centerY + (Math.random() - 0.5) * 200,
                })

                const newNode = {
                    id: createId(),
                    type: selection.type,
                    position: flowPosition,
                    data: {}
                }

                if(hasInitialsNode) {
                    return [newNode]
                }

                return [...nodes, newNode]
            })
            onOpenChange(false);
    }, [getNodes, setNodes, onOpenChange, screenToFlowPosition])
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>What triggers this workflow?</SheetTitle>
                    <SheetDescription>
                        A trigger is a step that run to workflow. Good for getting starts quickly.
                    </SheetDescription>
                </SheetHeader>

                <div>
                    {triggerNodes.map((nodeType) => {
                        const Icon = nodeType.icon;
                        return (
                            <div
                                key={nodeType.type}
                                onClick={() => handleNodeSelector(nodeType)}
                                className="flex items-center hover:cursor-pointer flex-row px-3 py-4  hover:border-l-3"
                            >
                                {typeof Icon === "string" ? (
                                    <Image src={Icon} alt="trigger-node" width={20} height={20} />
                                ) : (
                                    <Icon />
                                )}
                                <div className="flex flex-col ml-5">
                                    <span className="font-semibold"> {nodeType.label} </span>
                                    <span className="text-muted-foreground text-xs"> {nodeType.description} </span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div>
                    {executionNodes.map((nodeType) => {
                        const Icon = nodeType.icon;
                        return (
                            <div
                                key={nodeType.type}
                                onClick={() => handleNodeSelector(nodeType)}
                                className="flex items-center hover:cursor-pointer flex-row px-3 py-4  hover:border-l-3"
                            >
                                {typeof Icon === "string" ? (
                                    <Image src={Icon} alt="trigger-node" width={20} height={20} />
                                ) : (
                                    <Icon />
                                )}
                                <div className="flex flex-col ml-5">
                                    <span className="font-semibold"> {nodeType.label} </span>
                                    <span className="text-muted-foreground text-xs"> {nodeType.description} </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </SheetContent>
        </Sheet>
    )
}