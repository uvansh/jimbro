'use client'

import { Calendar, Home, ChefHat, ChartLine, ClipboardList, Settings, LucideOctagon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"

import { useSidebar } from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Routine",
    url: "/routine",
    icon: ClipboardList,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Meal Preparation",
    url: "/meal-prep",
    icon: ChefHat,
  },
  {
    title: "Progress",
    url: "/progress",
    icon: ChartLine,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
  console.log(isMobile)
  return (
    <Sidebar collapsible={isMobile?"":"none"} className="h-screen border border-neutral-800">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Logo.</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
      <SidebarFooter/>
    </Sidebar>
  )
}
