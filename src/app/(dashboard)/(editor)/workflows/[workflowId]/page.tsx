import { ErrorView, LoadingView } from "@/components/entity-components";
import { Editor } from "@/features/editor/components/editor";
import { EditorHeader } from "@/features/editor/components/editor-header";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const EditorLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <LoadingView message="Editor Loading..." />
        </div>
    )
}

export const EditorError = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <ErrorView message="Editor Error..." />
        </div>
    )
}

interface PageProps {
    params: Promise<{
        workflowId: string;
    }>
}

const Page = async ({ params }: PageProps) => {
    const { workflowId } = await params;
    prefetchWorkflow(workflowId);
    return (
        <HydrateClient>
            <ErrorBoundary fallback={<EditorError />}>
                <Suspense fallback={<EditorLoading />}>
                    <EditorHeader workflowId={workflowId} />
                    <main>
                        <Editor workflowId={workflowId} />
                    </main>
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
    )
}
export default Page;