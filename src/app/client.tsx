"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { LogoutButton } from "./logout-button";
import { Card } from "@/components/ui/card";

export const Client = () => {
    const trpc = useTRPC();
    const {data: users} = useSuspenseQuery(trpc.getUsers.queryOptions())
    return(
        <div className="flex flex-col justify-center p-7 m-9 items-center min-h-screen">
                {JSON.stringify(users)}
            <LogoutButton />
        </div>
    )
}