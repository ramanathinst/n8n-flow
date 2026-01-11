import Image from "next/image"
import Link from "next/link"

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-center mt-20 flex-col">
            <Link className="flex gap-2" href={"/"}>
                <Image src={"logos/logo.svg"} alt="logo" height={40} width={40} />
                <span className="font-semibold"> N8N-Flow </span>
            </Link>
            {children}
        </div>
    )
}