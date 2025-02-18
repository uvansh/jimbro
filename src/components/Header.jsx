"use client"

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { SignedIn, UserButton, SignInButton, SignedOut } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { BicepsFlexed } from "lucide-react";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Header = ({ toggler }) => {
    const { isLoaded, user } = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoaded) {
            setIsLoading(false)
        }
    }, [isLoaded])

    return (
        <Menubar className="flex bg-neutral-900 text-gray-100 items-center h-12 justify-between w-full">
            {isLoading ?
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <ClipLoader color="#4EFF02" />
                </div> :
                <>
                    <MenubarMenu>{toggler}</MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="text-xl text-neutral-300 font-bold ml-1"><span className="p-1"><BicepsFlexed /></span>jimBro</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <span className="mx-2 px-2">{user ? <SignedIn><UserButton /></SignedIn> : <SignedOut><SignInButton className="bg-white rounded-full py-1 px-3 text-black" /></SignedOut>}</span>
                    </MenubarMenu>
                </>
            }
        </Menubar>
    )
}

export default Header;