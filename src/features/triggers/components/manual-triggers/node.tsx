import { memo, useState } from "react";
import { BaseTriggersNode } from "../base-triggers-node";
import { MousePointerIcon } from "lucide-react";
import { NodeProps } from "@xyflow/react";
import { ManualTriggerDialog } from "./dialog";

export const ManualTriggersNode = memo((props: NodeProps) => {
    const nodeStatus = "initial"
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleSettings = () => setDialogOpen(true);
    return(
        <>
        <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        <BaseTriggersNode 
            {...props}
            name="Manual Trigger"
            description="When clicking 'Execute Workflow'"
            icon={MousePointerIcon}
            status={nodeStatus}
            onDoubleClick={handleSettings}
            onSettings={handleSettings}
        />
        </>
    )
})