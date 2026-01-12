"use client";

import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

export const WorkflowsList = () => {
    const { data: workflows } = useSuspenseWorkflows();
    return (
        <div>
            {JSON.stringify(workflows)}
        </div>
    )
}
export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const createWorkflow = useCreateWorkflow();
    const router = useRouter();
    const { modal, handleError } = useUpgradeModal();
    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }
    return (
        <>
            {modal}
            <EntityHeader
                name="Create Workflow"
                description="Create and manage workflow"
                onNew={handleCreate}
                newButtonLebal="New Workflow"
                disabled={disabled}
                isCreating={createWorkflow.isPending}
            />
        </>
    )
}
export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader />}
            search={<></>}
            pagination={<></>}
        >
            {children}
        </EntityContainer>
    )
}