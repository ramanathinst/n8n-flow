import { SidebarTrigger } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="px-5 py-5">
            <SidebarTrigger />
            <header className="mt-6  border-t">
                {children}
            </header>
        </div>
    )
}
export default Layout;