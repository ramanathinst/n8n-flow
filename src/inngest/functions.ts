import { inngest } from "./client";

export const aiExecute = inngest.createFunction(
    { id: "n8n-flow" },
    { event: "ai/execute" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "5s");
        return { message: `Hello ${event.data.email}!` };
    },
);