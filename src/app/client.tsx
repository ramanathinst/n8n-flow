"use client"

import { useTRPC } from "@/trpc/client"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { LogoutButton } from "./logout-button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Client = () => {
    const trpc = useTRPC();
    const testAi = useMutation(trpc.testAi.mutationOptions({
        onSuccess: () => {
            toast.success("Ai executed!")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))
    return(
        <div className="flex flex-col justify-center p-7 m-9 items-center min-h-screen">
                <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
                    Test Ai
                </Button>
            <LogoutButton />
        </div>
    )
}