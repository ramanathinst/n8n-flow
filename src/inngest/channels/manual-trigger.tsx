import { channel, topic } from "@inngest/realtime";

export const MANAUAL_TRIGGER_CHANNEL_NAME="http-request-channel-name"

export const manualTriggerChannel = channel(MANAUAL_TRIGGER_CHANNEL_NAME)
    .addTopic(
        topic("status").type<{
            nodeId: string;
            status: "success" | "error" | "loading"
        }>()
    );