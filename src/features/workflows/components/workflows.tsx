"use client";

import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";

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
// Workflows search
export const WorkflowsSearch = () => {
    const [ params, setParams] = useWorkflowsParams();
    const {searchValue, onSearchChange} = useEntitySearch({
        params,
        setParams
    })
    return(
        <EntitySearch 
            value={searchValue}
            onChange={onSearchChange}
            placeHolder="Search workflows"
        />
    )
}

// Workflows paginations
export const WorkflowsPagination = () => {
    const [params, setParams] = useWorkflowsParams();
    const {data: workflows} = useSuspenseWorkflows();
    return(
        <EntityPagination 
            page={workflows.page}
            totalPages={workflows.totalPages}
            onPageChange={(page) => setParams({...params, page})}
        />
    )
}
export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader />}
            search={<WorkflowsSearch />}
            pagination={<WorkflowsPagination />}
        >
            {children}
        </EntityContainer>
    )
}