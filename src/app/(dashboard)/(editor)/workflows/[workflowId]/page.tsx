import { requiredAuth } from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{
        workflowId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    await requiredAuth();

    const { workflowId } = await params;

    return (
        <div>
            Workflow ID: {workflowId}
        </div>
    );
}
