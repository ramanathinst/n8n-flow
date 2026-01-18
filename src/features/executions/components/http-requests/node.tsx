import { memo, useState } from "react";
import { BaseExecutionsNode } from "../base-executions-node";
import { GlobeIcon } from "lucide-react";
import { Node, useReactFlow, type NodeProps } from "@xyflow/react";
import { HttpRequestDialog, type HttpRequestFormValues } from "./dialog";

type HttpRequestNodeData = {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    body: string;
    [key: string]: unknown;
}
type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequsetsNode = memo((props: NodeProps<HttpRequestNodeType>) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleSettings = () => setDialogOpen(true);
    const nodeStatus = "initial"
    const nodeData = props.data;
    const description = nodeData.endpoint ? `${nodeData.method || "GET"}: ${nodeData.endpoint}` : "Not Configured!";
    const { setNodes } = useReactFlow();
    const handleSumit = (values: HttpRequestFormValues) => {
            setNodes((nodes) => nodes.map((node) => {
                if(node.id === props.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            method: values.method,
                            endpoint: values.endpoint,
                            body: values.body
                        }
                    }
                }
                return node;
            }))
    }
    return (
        <>
            <HttpRequestDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleSumit}
                defaultValues={nodeData}
            />
            <BaseExecutionsNode
                {...props}
                icon={GlobeIcon}
                name="Http Request"
                description={description}
                status={nodeStatus}
                onSettings={handleSettings}
                onDoubleClick={handleSettings}
            />
        </>
    )
})