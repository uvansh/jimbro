import {auth, currentUser} from '@clerk/nextjs/server'
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from '@/components/Header';

import {
  ClerkProvider,
  SignOutButton,
} from '@clerk/nextjs';

const inter = Inter({ subset: "latin" })

export const metadata = {
  title: "jim Bro",
  description: "An ai powered gym trainer and planner for fitness enthusiasts.",
};

export default async function RootLayout({ children }) {
  const { userId } = await auth()
  const user = await currentUser()

  
  if (!userId) {
    return <div>Sign in to view this page</div>
  }
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar userName={user.fullName} userSignOut={<SignOutButton/>} userImage={user.imageUrl} userEmail={user.emailAddresses[0].emailAddress} />
          <div className="flex flex-col flex-grow w-full">
              <Header toggler={<SidebarTrigger/>}/>
          <main className=" border border-neutral-800 flex-grow p-4 w-full overflow-x-hidden"> 
            {children}
          </main>
          </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
