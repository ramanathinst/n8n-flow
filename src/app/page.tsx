import { caller, getQueryClient, HydrateClient, prefetch, trpc } from "@/trpc/server";
import { prefetchLoader } from "./prefetch";
import { Suspense } from "react";
import { Client } from "./client";

const Page = async () => {
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