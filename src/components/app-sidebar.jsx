'use client'

import { Calendar, Home, ChefHat, ChartLine, ClipboardList, Settings, BicepsFlexed, LogOut } from "lucide-react"
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

export function AppSidebar(props) {
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
        <hr className="border border-b-2 border-neutral-700 mb-2 flex items-center"/>
      <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="flex items-center gap-2 mb-2 ml-2">
                      <img src={props.userImage} width={35} className="rounded-full"/>
                    <div className="flex flex-col">
                    <span>{props.userName}</span>
                    <span className="text-neutral-500 text-xs">{props.userEmail}</span>
                  </div>
                   {props.userSignOut}
                    </div>
                </SidebarMenuItem>
              </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    </>
  )
}
