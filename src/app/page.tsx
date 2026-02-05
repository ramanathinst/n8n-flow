import { Card, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";

const Page = async() => {
  const users = await prisma.user.findMany({})
  return(
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="px-5 py-5">
        <CardTitle>
          This is n8n-flow
          {JSON.stringify(users, null, 2)}
        </CardTitle>
      </Card>
    </div>
  )
}
export default Page;