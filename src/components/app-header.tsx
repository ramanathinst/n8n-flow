import { ModeToggle } from "./mode-toggle"
import { SidebarTrigger } from "./ui/sidebar"

export const AppHeader = () => {
    return (
        <header className="p-4 bg-accent">
            <div className="flex justify-between">
                <SidebarTrigger />
                <ModeToggle />
            </div>
        </header>
    )
}