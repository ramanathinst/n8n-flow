"use client"

import { Card, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout-button";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const aiExecute = useMutation(trpc.aiExecute.mutationOptions({
    onSuccess: () => {
      toast.success("Ai executed!")
    }
  }))
  return(
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="px-5 py-5 ">
        <CardTitle className="gap-6">
            <Button className="mb-5" disabled={aiExecute.isPending} onClick={() => aiExecute.mutate()}>
              Ai execute
            </Button>
          <LogoutButton />
        </CardTitle>
      </Card>
    </div>
  )
}
export default Page;