import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { CircleUser } from "lucide-react";

const Header = ({toggler}) => {

    return (
        <Menubar className="flex bg-neutral-900 text-gray-100 items-center h-12 justify-between w-full">
            <MenubarMenu>{toggler}</MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="text-xl font-bold">Logo</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger><CircleUser/></MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>My profile</MenubarItem>
                    <MenubarItem>Log Out</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default Header;