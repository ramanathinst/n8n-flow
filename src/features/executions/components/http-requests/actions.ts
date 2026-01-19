"use server";

import { httpReqeustChannel } from "@/inngest/channels/http-request";
import { inngest } from "@/inngest/client";
import { getSubscriptionToken, Realtime } from "@inngest/realtime";

export type HttpRequestToken = Realtime.Token<
    typeof httpReqeustChannel,
    ["status"]
>;

export async function fetchHttpRequestRealtimeToken(): Promise<HttpRequestToken> {

    const token = await getSubscriptionToken(inngest, {
        channel: httpReqeustChannel(),
        topics: ["status"],
    });

    return token;
}