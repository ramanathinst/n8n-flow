"use client"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSuspenseWorkflow, useUpdateWorkflow, useUpdateWorkflowName } from "@/features/workflows/hooks/use-workflows"
import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAtomValue } from "jotai"
import { editorAtoms } from "../store/atoms"

export const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
    const { data: workflow } = useSuspenseWorkflow(workflowId);
    const updateWorkflowName = useUpdateWorkflowName();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(workflow.name);
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(workflow.name) {
            setName(workflow.name)
        }
    }, [workflow.name])

    useEffect(() => {
        if(isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing])

    const handleSave = async() => {
        if(name === workflow.name) {
            setIsEditing(false)
            return;
        }
        try {
            await updateWorkflowName.mutateAsync({
                id: workflow.id,
                name
            })
        } catch {
            setName(workflow.name)
        } finally {
            setIsEditing(false)
        }
    }

    const handleKeyDown = async(e: React.KeyboardEvent) => {
        if(e.key === "Enter"){
            await handleSave();
        } else if(e.key === "Escape") {
            setIsEditing(false)
        }
    }

    if(isEditing) {
        return (
            <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                disabled={updateWorkflowName.isPending}
                ref={inputRef}
                className="w-60"
                />
        )
    }

    return (
        <BreadcrumbItem className="cursor-pointer hover:text-accent-foreground" onClick={() => setIsEditing(true)}>
            {workflow.name}
        </BreadcrumbItem>
    )
}

export const EditorBreadcrumbs = ({ workflowId }: { workflowId: string }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/workflows">Workflows</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="mt-1"/>
                <EditorNameInput workflowId={workflowId} />
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export const EditorSaveButton = ({workflowId}: {workflowId: string}) => {
    const saveWorkflow = useUpdateWorkflow();
    const editor = useAtomValue(editorAtoms);
    const handleSave = () => {
        if(!editor) {
            return;
        }
        const nodes = editor.getNodes();
        const edges = editor.getEdges();
        saveWorkflow.mutate({
            id: workflowId,
            nodes,
            edges
        })
    }
    return(
        <div className="flex mr-4">
            <Button disabled={saveWorkflow.isPending} onClick={handleSave}>
                Save
            </Button>
        </div>
    )
}

export const EditorHeader = ({ workflowId }: { workflowId: string }) => {
    return (
        <header className="p-4 bg-accent">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <SidebarTrigger className="mr-5" />
                    <EditorBreadcrumbs workflowId={workflowId} />
                </div>
                <div className="flex">
                    <EditorSaveButton workflowId={workflowId} />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}