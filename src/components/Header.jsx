import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { SignedIn, UserButton, SignInButton,SignedOut } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs/server';
import { BicepsFlexed } from "lucide-react";

const Header = async ({toggler}) => {
    const {userId} = await auth()
    return (
        <Menubar className="flex bg-neutral-900 text-gray-100 items-center h-12 justify-between w-full">  
            {!userId?"":<MenubarMenu>{toggler}</MenubarMenu>}
            <MenubarMenu>
                <MenubarTrigger className="text-xl text-neutral-300 font-bold ml-1"><span className="p-1"><BicepsFlexed/></span>jimBro</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <span className="mx-2">{userId?<SignedIn><UserButton/></SignedIn>:<SignedOut><SignInButton className="bg-white rounded-full py-1 px-3 text-black"/></SignedOut>}</span>
            </MenubarMenu>
        </Menubar>
    )
}

export default Header;