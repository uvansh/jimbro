
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from '@/components/Header';

import {
  ClerkProvider,
  SignOutButton,
} from '@clerk/nextjs';
import { auth,currentUser } from "@clerk/nextjs/server";

const inter = Inter({ subset: "latin" })

export const metadata = {
  title: "jim Bro",
  description: "An ai powered gym trainer and planner for fitness enthusiasts.",
};

export default async function RootLayout({ children }) {
  const { userId } = await auth();
  const user = await currentUser();

  return (
    <html lang="en">
      <ClerkProvider>
      <body
        className={`${inter.className} antialiased bg-neutral-900`}
        >
        <div className="flex h-full w-full overflow-hidden">
        <SidebarProvider>
          {userId!==null?<AppSidebar userName={user.fullName} userSignOut={<SignOutButton/>} userImage={user.imageUrl} userEmail={user.emailAddresses[0].emailAddress} />:""}
          <div className="flex h-full flex-col flex-grow w-full">
          <Header/>
          <main className="border border-neutral-800 h-full flex-grow p-4 w-full overflow-x-hidden"> 
            {children}
          </main>
          </div>
        </SidebarProvider>
          </div>
      </body>
    </ClerkProvider>
    </html>
  );
}
