import { type NodeStatus } from "@/components/react-flow/node-status-indicator"
import { Realtime } from "@inngest/realtime";
import { useInngestSubscription } from "@inngest/realtime/hooks";
import { useEffect, useState } from "react"

export type UseNodeStatusProps = {
    nodeId: string;
    topic: string;
    channel: string;
    refreshToken: () => Promise<Realtime.Subscribe.Token>
}

export const useNodeStatus = ({
    nodeId,
    topic,
    channel,
    refreshToken
}: UseNodeStatusProps) => {
    const [status, setStatus] = useState<NodeStatus>("initial")
    const { data } = useInngestSubscription({
        refreshToken,
        enabled: true
    })
    useEffect(() => {
        if(data?.length === 0){
            return;
        }
        const latestMessage = data.filter((msg) => 
            msg.kind === "data" && 
            msg.channel === channel && 
            msg.topic === topic && 
            msg.data.nodeId === nodeId
        ).sort((a,b) => {
            if(a.kind === "data" && b.kind === "data"){
                return(
                    new Date(b.createdAt).getTime() - 
                    new Date(a.createdAt).getTime()
                )
            }
            return 0;
        })[0]

        if(latestMessage?.kind === "data"){
            setStatus(latestMessage.data.status as NodeStatus)
        }
    }, [nodeId, topic, channel, data])
    return status;
}