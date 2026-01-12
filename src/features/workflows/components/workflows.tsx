"use client";

import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityLists, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { type Workflow } from "@/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import { WorkflowIcon } from "lucide-react";

export const WorkflowsList = () => {
    const { data: workflows } = useSuspenseWorkflows();
    return (
        <EntityLists 
            items={workflows.items}
            getKey={(workflow) => workflow.id}
            renderItem={(workflow) => <WorkflowsItem data={workflow} />}
            emptyView={<WorkflowsEmpty />}
            />
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

// Workflows loading view
export const WorkflowsLoading = () => {
    return(
        <LoadingView message="Workflows loading...." />
    )
}

// Workflows error view
export const WorkflowsError = () => {
    return(
        <ErrorView message="Workflows Error...." />
    )
}
// Workflows empty view

export const WorkflowsEmpty = () => {
    const router = useRouter();
    const createWorkflow = useCreateWorkflow();
    const { modal, handleError } = useUpgradeModal();
    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: () => {
                router.push("/workflows")
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }
    return(
        <>
        {modal}
        <EmptyView disabled={createWorkflow.isPending} onNew={handleCreate}  message="You don't have created any workflows."/>
        </>
    )
}

// Workflows item 
export const WorkflowsItem = ({data}: {data: Workflow}) => {
    const removeWorkflow = useRemoveWorkflow();
    const router = useRouter();
    const handleRemove = () => {
        removeWorkflow.mutate({
            id: data.id
        },{
            onSuccess: () => {
                router.push("/workflows")
            }
        })
    }
    return(
        <EntityItem 
            href={`/workflows/${data.id}`}
            title={data.name}
            subTitle={
                <>
                    CreatedAt: {formatDistanceToNow( data.createdAt, {addSuffix: true})} {""}
                    UpdatedAt: {formatDistanceToNow( data.updatedAt, {addSuffix: true})} {""}
                    
                </>
            }
            image={<WorkflowIcon />}
            onRemove={handleRemove}
            isRemoving={removeWorkflow.isPending}
            />
    )
}