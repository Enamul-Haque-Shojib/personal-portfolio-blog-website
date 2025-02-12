
'use client'
import React, { ReactNode, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '@/components/dashboard/appSidebar/AppSidebar';
import { SessionProvider } from 'next-auth/react';
type Child = {
    children: ReactNode
}

export type SidebarBoolean = {sidebarOpen: boolean}

const DashboardLayout = ({children}:Child) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setSidebarOpen((prev) => !prev);
    };
    return (
        <div className="flex">
          
        <SidebarProvider >
        <AppSidebar sidebarOpen ={sidebarOpen} />
        <main className="flex-1">
          <SidebarTrigger onClick={toggleSidebar} />
           
            {children}
            </main>
            </SidebarProvider>
        </div>
    );
};

export default DashboardLayout;