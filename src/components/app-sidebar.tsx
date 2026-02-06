"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Workflow,
    KeyRound,
    PlayCircle,
    CreditCard,
    LogOut,
    Sparkles,
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

const items = [
    { title: "Workflows", href: "/workflows", icon: Workflow },
    { title: "Credentials", href: "/credentials", icon: KeyRound },
    { title: "Executions", href: "/executions", icon: PlayCircle },
]

export function AppSidebar() {
    const pathname = usePathname()
    const { state } = useSidebar()
    const collapsed = state === "collapsed"

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
                <SidebarFooter>
                    <FooterButton
                        icon={Sparkles}
                        label="Upgrade to Pro"
                        collapsed={collapsed}
                    />
                    <FooterButton
                        icon={CreditCard}
                        label="Billing Portal"
                        collapsed={collapsed}
                    />
                    <FooterButton
                        icon={LogOut}
                        label="Logout"
                        collapsed={collapsed}
                        destructive
                    />
                </SidebarFooter>
            </Sidebar>
        </TooltipProvider>
    )
}

function FooterButton({
    icon: Icon,
    label,
    collapsed,
    destructive,
}: {
    icon: any
    label: string
    collapsed: boolean
    destructive?: boolean
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <SidebarMenuButton
                    className={destructive ? "text-destructive" : ""}
                >
                    <Icon />
                    <span>{label}</span>
                </SidebarMenuButton>
            </TooltipTrigger>

            {collapsed && (
                <TooltipContent side="right">
                    {label}
                </TooltipContent>
            )}
        </Tooltip>
    )
}
