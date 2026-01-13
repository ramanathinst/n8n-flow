import { NodeToolbar, Position } from "@xyflow/react";
import { Button } from "./ui/button";
import { SettingsIcon, TrashIcon } from "lucide-react";

interface WorkflowNodeProps {
    children?: React.ReactNode;
    name?: string;
    description?: string;
    onSettings?: () => void;
    onDelete?: () => void;
    showToolbar?: boolean;
}

export const WorkflowNode = ({
    children,
    name,
    description,
    onSettings,
    onDelete,
    showToolbar = true
}: WorkflowNodeProps) => {
    return(
        <>
            {showToolbar && (
                <NodeToolbar className="flex gap-6">
                    <Button variant={"outline"} onClick={onSettings} className="cursor-pointer">
                        <SettingsIcon />
                    </Button>
                    <Button variant={"outline"} onClick={onSettings} className="cursor-pointer">
                        <TrashIcon />
                    </Button>
                </NodeToolbar>
            )}
            {children}
            {name && (
                <NodeToolbar position={Position.Bottom} isVisible >
                    <div>
                        <span className="font-semibold"> {name} </span>
                        {description && (
                            <span className="text-muted-foreground text-sm"> {description} </span>
                        )}
                    </div>
                </NodeToolbar>
            )}
        </>
    )
}