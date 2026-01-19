import { NonRetriableError } from "inngest";
import { NodeExecutor } from "../../types";
import ky, { type Options as KyOptions } from "ky"
import HandleBars from "handlebars";

HandleBars.registerHelper("json", (context) => {
    const jsonString = JSON.stringify(context, null, 2);
    const safeString = new HandleBars.SafeString(jsonString);
    return safeString;
})

type HttpRequestData = {
    variableName: string;
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
}
export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
    data,
    nodeId,
    context,
    step
}) => {
    if (!data.endpoint) {
        throw new NonRetriableError("Http Request node: Not endpoint configured!")
    }
    if (!data.variableName) {
        throw new NonRetriableError("Http Request node: Not variable configured!")
    }
    if (!data.method) {
        throw new NonRetriableError("Http Request node: Not method configured!")
    }
    const result = await step.run("http-request", async () => {
        const endpoint = HandleBars.compile(data.endpoint)(context);
        const method = data.method;
        const options: KyOptions = { method };

        if (["PUT", "POST", "PATCH"].includes(method)) {
            const resolved = HandleBars.compile(data.body || "{}")(context);
            JSON.parse(resolved);
            options.body = resolved;
            options.headers = {
                "Content-Type": "application/json"
            }
        }

        const response = await ky(endpoint, options);
        const contentType = response.headers.get("content-type");
        const responseData = contentType?.includes("application/json") ?
            await response.json() : await response.text();

        const responsePayload = {
            httpResponse: {
                status: response.status,
                statusText: response.statusText,
                data: responseData,
            }
        }
        return {
            ...context,
            [data.variableName]: responsePayload
        }
    })
    return result;
}