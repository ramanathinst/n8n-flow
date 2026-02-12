"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useSuspenseWorkflow, useUpdateWorkflowName } from "@/features/workflows/hooks/use-workflows"
import { useState, useRef, useEffect } from "react"

export const EditorNameInput = ({workflowId}: {workflowId: string }) => {
    const { data: workflow } = useSuspenseWorkflow(workflowId);
    const updateWorkflowName = useUpdateWorkflowName(workflowId);
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(workflow.name)
    const inputRef = useRef<HTMLInputElement>(null)

    // Auto focus when switching to edit mode
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])

    const handleSave = async() => {
        if (workflow.name === name ) {
            setName(workflow.name)
            setIsEditing(false)
            return
        }
        updateWorkflowName.mutateAsync({ id: workflowId, name })
        setIsEditing(false)
    }

    return (
        <BreadcrumbItem>
            {isEditing ? (
                <input
                    disabled={updateWorkflowName.isPending}
                    ref={inputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSave()
                        }
                    }}
                    className="h-8 rounded-md border bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-sm font-medium hover:underline cursor-pointer"
                >
                    {workflow.name}
                </button>
            )}
        </BreadcrumbItem>
    )
}

export const EditorHeader = ({workflowId}: {workflowId: string}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/workflows">Workflows</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <EditorNameInput workflowId={workflowId} />
            </BreadcrumbList>
        </Breadcrumb>
    )
}