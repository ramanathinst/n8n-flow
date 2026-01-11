import { requiredAuth } from "@/lib/auth-utils";

const Page = async() => {
    await requiredAuth();
    return (
        <div>
            Credentials Page
        </div>
    )
}
export default Page;