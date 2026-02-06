"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    Workflow,
    KeyRound,
    PlayCircle,
    CreditCard,
    LogOut,
    Sparkles,
    StarIcon,
    CreditCardIcon,
    LogOutIcon,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "./ui/button"
import { authClient } from "@/lib/auth-client"
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscriptions"

const items = [
    { title: "Workflows", href: "/workflows", icon: Workflow },
    { title: "Credentials", href: "/credentials", icon: KeyRound },
    { title: "Executions", href: "/executions", icon: PlayCircle },
]

export function AppSidebar() {
    const pathname = usePathname()
    const { state } = useSidebar()
    const collapsed = state === "collapsed"
    const router = useRouter();
    const { hasActiveSubscription, isLoading} = useHasActiveSubscription();
    return (
        <TooltipProvider delayDuration={0}>
            <Sidebar collapsible="icon">
                {/* Header */}
                <SidebarHeader className="font-bold mb-7 self-center">
                    {collapsed ? "N8N" : "N8N-FLOW"}
                </SidebarHeader>

                {/* Content */}
                <SidebarContent>
                    <SidebarMenu>
                        {items.map((item) => {
                            const active =
                                pathname === item.href ||
                                pathname.startsWith(`${item.href}/`)

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={active}
                                            >
                                                <Link href={item.href}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </TooltipTrigger>

                                        {collapsed && (
                                            <TooltipContent side="right">
                                                {item.title}
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarContent>

                {/* Footer */}
                {/* ✅ FOOTER ACTION BUTTONS */}
                <SidebarFooter>
                    {!hasActiveSubscription && !isLoading && (
                        <SidebarMenuButton
                        tooltip={"Upgarde to Pro"}
                        onClick={() => authClient.checkout({ slug: "n8n"})}
                        className="cursor-pointer"
                    >
                        <StarIcon />
                        Upgarde to Pro
                    </SidebarMenuButton>
                    )}

                    <SidebarMenuButton
                    tooltip={"Billing Portal"}
                        onClick={() => authClient.customer.portal()}
                        className="cursor-pointer"
                    >
                        <CreditCardIcon />
                        Billing Portal
                    </SidebarMenuButton>
                    <SidebarMenuButton
                        disabled={false}
                        tooltip={"Logout"}
                        onClick={() => authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push("/login")
                                }
                            }
                        })}
                        className="cursor-pointer"
                    >
                        <LogOutIcon />
                        Logout
                    </SidebarMenuButton>
                </SidebarFooter>
            </Sidebar>
        </TooltipProvider>
    )
}