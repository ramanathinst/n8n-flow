import { inngest } from "./client";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export const aiExecute = inngest.createFunction(
    { id: "ai-execute" },
    { event: "ai/execute" },

    async ({ event, step }) => { 
        const {steps} = await step.ai.wrap("openapi-generate-text", generateText, {
            model: openai("gpt-5"),
            system: "You are helpfull assistent",
            prompt: "latest new of war?"
        })
        return steps;
    }
);
