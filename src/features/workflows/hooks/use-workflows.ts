import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams()
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
}

export const useCreateWorkflow = () => {
    const trpc = useTRPC();
    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow created name: ${data.name}`)
        },
        onError: (error) => {
            toast.error(`Field to create workflow ${error.message}`)
        }
    }));
}

export const useRemoveWorkflow = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    return useMutation(trpc.workflows.remove.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow deleted name: ${data.name}`)
            queryClient.invalidateQueries(trpc.workflows.getOne.queryFilter({id: data.id}))
        },
        onError: (error) => {
            toast.error(`Field to delete workflow ${error.message}`)
        }
    }));
}