import { requiredAuth } from "@/lib/auth-utils";

const Page = async() => {
    await requiredAuth();
    return (
        <div>
            Workflow Page
        </div>
    );
}

export default Page;