"use client"
import { CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyRoundIcon, LogOutIcon, StarIcon, Workflow } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription"
import Image from "next/image"
import Link from "next/link"

// Menu items.
const menuItems = [
    {
        title: "main",
        items: [
            {
                title: "Workflows",
                icon: FolderOpenIcon,
                url: "/workflows"
            },

            {
                title: "Executions",
                icon: KeyRoundIcon,
                url: "/executions"
            },

            {
                title: "Credentials",
                icon: HistoryIcon,
                url: "/credentials"
            },
        ]

    }
]

export function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { hasActiveSubscription, isLoading } = useHasActiveSubscription();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="mb-6">
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="gap-x-4 px-4 h-10">
                        <Link href={"/"} prefetch>
                            <Image src={"/logos/logo.svg"} className="size-4" height={30} width={30} alt="n8n" />
                            <span className="font-semibold text-sm">N8N</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={item.url === "/" ? pathname === "/" : pathname.startsWith(item.url)}
                                        >
                                            <item.icon className="size-4" />
                                            <Link href={item.url}>
                                                <span> {item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>

                        {!hasActiveSubscription && !isLoading && (
                            <SidebarMenuButton onClick={() => authClient.checkout({ slug: "Pro" })} tooltip={"Upgrade to Pro"} className="hover:cursor-pointer">
                                <StarIcon />
                                Upgrade to Pro
                            </SidebarMenuButton>
                        )}

                        <SidebarMenuButton onClick={() => authClient.customer.portal()} tooltip={"Billing portal"} className="hover:cursor-pointer">
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
        </Sidebar >
    )
}