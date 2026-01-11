import { requiredAuth } from "@/lib/auth-utils";
import { Client } from "../client"
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";

const Page = async() => {
    await requiredAuth();
    return(
        <HydrateClient>
            <Suspense>
                <Client />
            </Suspense>
        </HydrateClient>
    )
}
export default Page;