import { useTRPC } from "@/trpc/client"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
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