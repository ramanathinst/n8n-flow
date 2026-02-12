import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [ params ] = useWorkflowsParams();
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
}

export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({id}));
}

export const useCreateWorflow = () => {
    const router = useRouter();
    const trpc = useTRPC();
    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success("Workflow Created successful")
            router.push(`/workflows/${data.id}`)
        },
        onError: (error) =>  {
            toast.error(error.message)
        }
    }))
}

export const useRemoveWorkflow = (id: string) => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    return useMutation(trpc.workflows.remove.mutationOptions({
        onSuccess: () => {
            toast.success("Workflow Deleted successful")
            queryClient.invalidateQueries(trpc.workflows.getMany.queryFilter({}))
            queryClient.invalidateQueries(trpc.workflows.getOne.queryFilter({id}))
        },
        onError: (error) =>  {
            toast.error(error.message)
        }
    }))
}

export const useUpdateWorkflowName = (id: string) => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    return useMutation(trpc.workflows.updateName.mutationOptions({
        onSuccess: () => {
            toast.success("Workflow Name Updated successful")
            queryClient.invalidateQueries(trpc.workflows.getMany.queryFilter({}))
            queryClient.invalidateQueries(trpc.workflows.getOne.queryFilter({id}))
        },
        onError: (error) =>  {
            toast.error(error.message)
        }
    }))
}