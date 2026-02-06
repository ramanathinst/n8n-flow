"use client"

import { Card, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout-button";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCreateWorflow } from "@/features/workflows/hooks/use-workflows";

const Page = () => {
  const createWorkflow = useCreateWorflow();
  return(
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="px-5 py-5 ">
        <CardTitle className="gap-6">
            <Button className="mb-5" disabled={createWorkflow.isPending} onClick={() => createWorkflow.mutate()}>
              Create Workflow
            </Button>
          <LogoutButton />
        </CardTitle>
      </Card>
    </div>
  )
}
export default Page;