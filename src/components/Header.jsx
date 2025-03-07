"use client"

import {
  Menubar,
  MenubarMenu,
} from "@/components/ui/menubar"
import { SignedIn, UserButton, SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { BicepsFlexed, UserRoundPenIcon } from "lucide-react";
import { SidebarTrigger } from '@/components/ui/sidebar'; // Shadcn Sidebar
import { useEffect,useState } from "react";


const Header = () => {
  const { isLoaded, user } = useUser();
  const [isLoading,setIsLoaded] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoaded(prev=>!prev);
    }
  }, [isLoaded]);

  return (
    <header className="text-neutral-300 h-12">
      <Menubar className="bg-neutral-900 flex items-center justify-center h-12">
        {/* Left: Sidebar Trigger */}
        <div className="w-[60px] flex items-center lg:hidden">
          {!isLoaded? (
            <div className="mx-2 h-5 w-5 bg-neutral-700 animate-pulse rounded" />
          ) : !user? (
            ""
          ):<SidebarTrigger>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </SidebarTrigger>}
        </div>

        {/* Middle: Logo */}
        <div className="flex-1 flex justify-center lg:justify-between">
          <span className="text-xl flex items-center text-neutral-300 font-bold ml-1"><span className="p-1"><BicepsFlexed /></span>jimBro</span>
        </div>
        {/* Right: Clerk user data */}
        <div className="w-[120px] flex justify-end">
          {!isLoaded ? (
            <div className="h-8 w-8 bg-neutral-700 animate-pulse rounded-full" />
          ) : !user ? (
            <MenubarMenu>
              <SignInButton mode="modal" className="cursor-pointer mr-1" >
                <UserRoundPenIcon color="#fffff1" />
              </SignInButton>
            </MenubarMenu>
          ) : (
            <MenubarMenu>
              {user ? <SignedIn><UserButton /></SignedIn> : <SignedOut><SignInButton className="bg-white rounded-full py-1 px-3 text-black" /></SignedOut>}
            </MenubarMenu>
          )}
        </div>
      </Menubar>
    </header>
  )
}

export default Header;