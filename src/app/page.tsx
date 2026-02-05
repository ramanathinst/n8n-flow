import { Card, CardTitle } from "@/components/ui/card";

const Page = () => {
  return(
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="px-5 py-5">
        <CardTitle>
          This is n8n-flow
        </CardTitle>
      </Card>
    </div>
  )
}
export default Page;