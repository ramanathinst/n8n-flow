import { requiredAuth } from "@/lib/auth-utils";

const Page = async() => {
    await requiredAuth();
    return (
        <div>
            Executions Page
        </div>
    )
}
export default Page;