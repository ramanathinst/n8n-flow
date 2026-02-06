"use client"

import { useSuspenseWorkflows } from "../hooks/use-workflows";

export const WorkflowsList = () => {
    const {data: workflows} = useSuspenseWorkflows();
    return (
        <div>
            {JSON.stringify(workflows, null, 2)}
        </div>
    )
}