import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from '@/components/Header';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const inter = Inter({ subset: "latin" })

export const metadata = {
  title: "jim Bro",
  description: "An ai powered gym trainer and planner for fitness enthusiasts.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <div className="flex flex-col flex-grow w-full">
              <Header toggler={<SidebarTrigger/>} className="w-full"/>
          <main className="bg-neutral-900 border border-neutral-800 flex-grow p-4 w-full overflow-x-hidden"> 
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
