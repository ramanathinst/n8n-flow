import { authClient } from "@/lib/auth-client"
import { useQuery } from "@tanstack/react-query"

export const useSubscription = () => {
    return useQuery({
        queryKey: ["subscriptions"],
        queryFn: async() => {
            const data = await authClient.customer.state();
            return data;
        }
    })
}

export const useHasActiveSubscription = () => {
    const { data: customerState, isLoading, ...rest } = useSubscription();
    const hasActiveSubscription = customerState?.data?.activeSubscriptions && customerState.data.activeSubscriptions.length > 0;

    return {
        hasActiveSubscription,
        isLoading,
        ...rest,
        subscription: customerState?.data?.activeSubscriptions[0]
    }
}