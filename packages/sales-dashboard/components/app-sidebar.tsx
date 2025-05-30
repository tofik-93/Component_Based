"use client"

import type * as React from "react"
import {
  BarChart3,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  Inbox,
  TrendingUp,
  Users,
  User2,
  Settings,
  Target,
} from "lucide-react"

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
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "@/hooks/use-toast"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView: string
  onViewChange: (view: string) => void
}

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: Home,
    },
  ],
  salesManagement: [
    {
      title: "Leads",
      url: "leads",
      icon: Users,
    },
    {
      title: "Deals",
      url: "deals",
      icon: Target,
    },
    {
      title: "Companies",
      url: "companies",
      icon: Building2,
    },
    {
      title: "Pipeline",
      url: "pipeline",
      icon: TrendingUp,
    },
    {
      title: "Forecasting",
      url: "forecasting",
      icon: BarChart3,
    },
  ],
  navSecondary: [
    {
      title: "Analytics",
      url: "analytics",
      icon: BarChart3,
    },
    {
      title: "Reports",
      url: "reports",
      icon: TrendingUp,
    },
    {
      title: "Calendar",
      url: "calendar",
      icon: Calendar,
    },
    {
      title: "Inbox",
      url: "inbox",
      icon: Inbox,
    },
    {
      title: "Settings",
      url: "settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ activeView, onViewChange, ...props }: AppSidebarProps) {
  const handleNavigation = (view: string, title: string) => {
    onViewChange(view)
    toast({
      title: "Navigation",
      description: `Switched to ${title}`,
    })
  }

  const handleUserAction = (action: string) => {
    toast({
      title: "User Action",
      description: `${action} clicked`,
    })
  }

  const isSalesManagementActive = data.salesManagement.some((item) => item.url === activeView)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <button onClick={() => handleNavigation("dashboard", "Dashboard")}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TrendingUp className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SalesForce Pro</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={activeView === item.url}>
                    <button onClick={() => handleNavigation(item.url, item.title)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                Sales Management
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.salesManagement.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={activeView === item.url}>
                        <button onClick={() => handleNavigation(item.url, item.title)}>
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={activeView === item.url}>
                    <button onClick={() => handleNavigation(item.url, item.title)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <User2 className="size-4" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">John Doe</span>
                    <span className="truncate text-xs">Sales Manager</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={() => handleUserAction("Account")}>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUserAction("Billing")}>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUserAction("Sign out")}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
