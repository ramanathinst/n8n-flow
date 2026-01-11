interface PageProps {
    params: Promise<{
        credentialId: string;
    }>
}

const Page = async({ params }: PageProps) => {
    const { credentialId } = await params;
    return (
        <div>
            Crendential id: {credentialId}
        </div>
    )
}
export default Page;