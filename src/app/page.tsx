import prisma from "@/lib/db";

const Page = async() => {

  // prisma api call
  const users = await prisma.user.findMany({
    where: {
      id: 1
    }
  })
  return(
    <div className="flex justify-center items-center min-h-screen">
      Hi, There are all Users:
      {JSON.stringify(users)}
    </div>
  )
}

export default Page;