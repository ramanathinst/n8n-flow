"use client"
import { CreditCardIcon, HistoryIcon, KeyRoundIcon, LogOutIcon, StarIcon, Workflow } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

// Menu items.
const items = [
    {
        title: "Workflows",
        url: "/workflows",
        icon: Workflow,
    },
    {
        title: "Executions",
        url: "/executions",
        icon: HistoryIcon,
    },
    {
        title: "Credentiails",
        url: "/credentials",
        icon: KeyRoundIcon,
    }
]

export function AppSidebar() {
    const router = useRouter();
    const pathName = usePathname();
    return (
        <Sidebar collapsible="icon">
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold text-md mb-5">N8N-FLOW</SidebarGroupLabel>
                    <SidebarGroupContent >
                        <SidebarMenu >
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton 
                                    isActive={ pathName === "/" ? pathName === "/" : pathName.startsWith(item.url)}
                                    asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                
            </SidebarContent>
            <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip={"Upgrade to Pro"} className="hover:cursor-pointer">
                                <StarIcon />
                                Upgrade to Pro
                            </SidebarMenuButton>

                            <SidebarMenuButton tooltip={"Billing portal"} className="hover:cursor-pointer">
                                <CreditCardIcon />
                                Billing portal
                            </SidebarMenuButton>

                            <SidebarMenuButton onClick={() => authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.push("/login")
                                        toast.success("you'r logout!")
                                    },
                                    onError: (ctx) => {
                                        toast.error(ctx.error.message)
                                    }
                                }
                            })} tooltip={"Logout"} className="hover:cursor-pointer">
                                <LogOutIcon />
                                Logout
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
        </Sidebar>
    )
}