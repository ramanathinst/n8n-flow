import { ErrorView, LoadingView } from "@/components/entity-components";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Editor } from "@/features/editor/components/editor";
import { EditorHeader } from "@/features/editor/components/editor-header";
import { requiredAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
    params: Promise<{
        workflowId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    await requiredAuth();
    const { workflowId } = await params;
    return (
        <HydrateClient>
            <ErrorBoundary fallback={<EditorError />}>
                <Suspense fallback={<EditorLoading />}>
                    <div className="px-5 py-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start">
                                <SidebarTrigger />
                                <EditorHeader workflowId={workflowId} />
                            </div>
                            <div>
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <main>
                        <Editor workflowId={workflowId} />
                    </main>
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
    );
}

export const EditorLoading = () => {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <LoadingView message="Editor Loading..." />
        </div>
    )
}

export const EditorError = () => {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <ErrorView message="Editor Error..." />
        </div>
    )
}
