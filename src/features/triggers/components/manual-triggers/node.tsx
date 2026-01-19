import { memo, useState } from "react";
import { BaseTriggersNode } from "../base-triggers-node";
import { MousePointerIcon } from "lucide-react";
import { NodeProps } from "@xyflow/react";
import { ManualTriggerDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { MANAUAL_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/manual-trigger";
import { fetchManualTriggerRealtimeToken } from "./actions";

export const ManualTriggersNode = memo((props: NodeProps) => {
    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        topic: "status",
        channel: MANAUAL_TRIGGER_CHANNEL_NAME,
        refreshToken: fetchManualTriggerRealtimeToken,
    })
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleSettings = () => setDialogOpen(true);
    return (
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