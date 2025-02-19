'use client'

import { Calendar, Home, ChefHat, ChartLine, ClipboardList, Settings, BicepsFlexed} from "lucide-react"
import Link from 'next/link'
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

import { useIsMobile } from "@/hooks/use-mobile"

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
  async function getDeviceInfo(){
    await useIsMobile();
  }
  return (
    <>
    <Sidebar side="left" collapsible={getDeviceInfo?"":"none"} className="h-screen border border-neutral-800">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold mb-10 mt-5"><span className="p-1"><BicepsFlexed/></span>jimBro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton  asChild>
                    <Link href={item.url}>
                      <item.icon/>
                      <span className="text-lg font-normal">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter/>
    </Sidebar>
    </>
  )
}
