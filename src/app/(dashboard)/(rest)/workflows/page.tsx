import { requiredAuth } from "@/lib/auth-utils";

const Page = async() => {
    await requiredAuth();
    return (
        <div>
            Workflows Page
        </div>
    )
}
export default Page;