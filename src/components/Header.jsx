import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { SignedIn, UserButton, SignInButton,SignedOut } from "@clerk/nextjs";
import { auth, currentUser } from '@clerk/nextjs/server';


const Header = async ({toggler}) => {
    const {userId} = await auth()
    return (
        <Menubar className="flex bg-neutral-900 text-gray-100 items-center h-12 justify-between w-full">  
            {!userId?"":<MenubarMenu>{toggler}</MenubarMenu>}
            <MenubarMenu>
                <MenubarTrigger className="text-xl font-bold">jimBro</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                {userId?<SignedIn><UserButton/></SignedIn>:<SignedOut><SignInButton className="bg-white rounded-full py-1 px-3 text-black"/></SignedOut>}
            </MenubarMenu>
        </Menubar>
    )
}

export default Header;