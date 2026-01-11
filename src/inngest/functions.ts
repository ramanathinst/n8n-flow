import { inngest } from "./client";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import * as Sentry from "@sentry/nextjs";


export const aiExecute = inngest.createFunction(
    { id: "ai-execute" },
    { event: "ai/execute" },
    async ({ event, step }) => {

        Sentry.logger.info('User triggered ai execute', { log_source: 'sentry_test' })

        const { steps } = await step.ai.wrap("openapi-generate-text", generateText, {
            model: openai("gpt-5"),
            system: "You are helpfull assistent",
            prompt: "what is 9 + 9?",
            experimental_telemetry: {
                recordInputs: true,
                recordOutputs: true,
                isEnabled: true
            }
        })
        return steps;
    }
);
