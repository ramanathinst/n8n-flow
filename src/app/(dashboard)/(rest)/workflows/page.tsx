import { WorkflowsList } from "@/features/workflows/components/workflows";
import { requiredAuth } from "@/lib/auth-utils";

const Page = async() => {
    await requiredAuth();
    return (
        <div>
            <WorkflowsList />
        </div>
    );
}

export default Page;