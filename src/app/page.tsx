import { caller, getQueryClient, HydrateClient, prefetch, trpc } from "@/trpc/server";
import { prefetchLoader } from "./prefetch";
import { Suspense } from "react";
import { Client } from "./client";
import { requiredAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requiredAuth();
  prefetchLoader();
  return (
    <HydrateClient>
      <Suspense>
        <Client />
      </Suspense>
    </HydrateClient>
  )
}

export default Page;