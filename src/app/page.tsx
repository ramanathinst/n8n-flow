import { Card, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout-button";

const Page = async() => {
  const users = await caller.getUsers()
  return(
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="px-5 py-5">
        <CardTitle>
          This is n8n-flow
          {JSON.stringify(users)}
          <LogoutButton />
        </CardTitle>
      </Card>
    </div>
  )
}
export default Page;