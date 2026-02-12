import { prefetch, trpc } from "@/trpc/server"
import { inferInput } from "@trpc/tanstack-react-query"

type Input = inferInput<typeof trpc.workflows.getMany>
export const prefetchWorkflowsParams = (params: Input) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params))
}

export const prefetchWorkflowParams = (id: string) => {
    return prefetch(trpc.workflows.getOne.queryOptions({id}))
}