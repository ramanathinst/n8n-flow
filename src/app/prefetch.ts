import { prefetch, trpc } from "@/trpc/server"

export const prefetchLoader = () => {
    return prefetch(trpc.getUsers.queryOptions());
}