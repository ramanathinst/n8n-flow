import { ErrorView, LoadingView } from "@/components/entity-components";
import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflows";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflowsParams } from "@/features/workflows/server/prefetch";
import { requiredAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { type SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary"

interface PageProps {
    searchParams: Promise<SearchParams>
}
const Page = async ({ searchParams }: PageProps) => {
    await requiredAuth();
    const params = await workflowsParamsLoader(searchParams);
    prefetchWorkflowsParams(params);
    return (
        <WorkflowsContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<ErrorView />}>
                    <Suspense fallback={<LoadingView />}>
                        <WorkflowsList />
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowsContainer>
    );
}

export default Page;