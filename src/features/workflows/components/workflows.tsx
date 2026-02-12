"use client"

import { EmptyView, EntityContainer, EntityHeader, EntityList, EntityListItem, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useCreateWorflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { Workflow } from "@/generated/prisma/client";
import { WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { use } from "react";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntityDebouncedSearchInput } from "@/hooks/use-entity-search";

export const WorkflowsList = () => {

    const { data: workflows } = useSuspenseWorkflows();
    return (
        <EntityList
            items={workflows.items}
            renderItem={(workflow) => (
                <WorkflowsItem data={{
                    ...workflow,
                    createdAt: new Date(workflow.createdAt),
                    updatedAt: new Date(workflow.updatedAt),
                }} />
            )}
            getKey={(workflow) => workflow.id}
            emptyView={<WorkflowsEmpty />}
        />
    )
}

export const WorkflowsItem = ({ data }: { data: Workflow }) => {
    const router = useRouter();
    const removeWorkflow = useRemoveWorkflow(data.id);
    const handleDelete = () => {
        removeWorkflow.mutate({ id: data.id }, {
            onSuccess: () => {
                router.push("/workflows")
            }
        })
    }
    return (
        <EntityListItem
            href={`/workflows/${data.id}`}
            name={data.name}
            subTitle={
                <>
                    CreatedAt: {formatDistanceToNow(data.updatedAt, { addSuffix: true })} {" "}  &bull;
                    UpdatedAt: {formatDistanceToNow(data.createdAt, { addSuffix: true })} {" "}
                </>
            }
            icon={<WorkflowIcon />}
            onRemove={handleDelete}
            disabled={removeWorkflow.isPending}
        />
    )
}

export const WorkflowsEmpty = () => {
    const createWorkflow = useCreateWorflow();

    const handleCreate = () => {
        createWorkflow.mutate();
    }
    return (
        <EmptyView isCreating={createWorkflow.isPending} onCreate={handleCreate} message="There are no workflows here yet. Start by creating a new workflow." />
    )
}

export const WorkflowsHeader = () => {
    const createWorkflow = useCreateWorflow();

    const handleCreate = () => {
        createWorkflow.mutate();
    }
    return (
        <EntityHeader
            title="Workflows"
            description="Create and manage your workflows"
            onNewButton={handleCreate}
            disabled={createWorkflow.isPending}
        />
    )
}

export const WorkflowsSearch = () => {
    const [params, setParams] = useWorkflowsParams();
    const { searchValue, setSearchValue } = useEntityDebouncedSearchInput({
        params,
        setParams
    })
    return (
        <EntitySearch
            placeholder="Search Workflows..."
            value={searchValue}
            onChangeValue={setSearchValue}
        />
    )
}

export const WorkflowsPagination = () => {
    const { data: workflows } = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowsParams();
    return (
        <EntityPagination
            page={workflows.page}
            totalPages={workflows.totalPages}
            onPageChange={(page) => setParams({ ...params, page })}
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