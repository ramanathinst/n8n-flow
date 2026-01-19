import { channel, topic } from "@inngest/realtime";

export const HTTP_REQUEST_CHANNEL_NAME="http-request-channel-name"

export const httpReqeustChannel = channel(HTTP_REQUEST_CHANNEL_NAME)
    .addTopic(
        topic("status").type<{
            nodeId: string;
            status: "success" | "error" | "loading"
        }>()
    );