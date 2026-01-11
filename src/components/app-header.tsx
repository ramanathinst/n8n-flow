import { SidebarTrigger } from "./ui/sidebar"

export const AppHeader = () => { 
    return(
        <header className="p-4 bg-accent">
            <SidebarTrigger />
        </header>
    )
}