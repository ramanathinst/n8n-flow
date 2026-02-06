import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="px-5 py-5">
            <div className="flex items-center justify-between">
                <SidebarTrigger />
                <ModeToggle />
            </div>
            <header className="mt-6  border-t">
                {children}
            </header>
        </div>
    )
}
export default Layout;