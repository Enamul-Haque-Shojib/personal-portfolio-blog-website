'use client'

import React, { useState } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import { ChartSpline, User, Package, BookDown, Truck, Star, LogOut, Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { SidebarBoolean } from "@/app/dashboard/layout";
import { signOut } from "next-auth/react";


// import useAuth from "@/hooks/useAuth";


const AppSidebar = ({ sidebarOpen }: SidebarBoolean) => {

  
const role = 'User'

  
  const items = {
    User: [
      
      { title: "Add Project", url: "add_project", icon: Package },
      { title: "All Projects", url: "all_projects", icon: Package },
      { title: "Add Blog", url: "add_blog", icon: Package },
      { title: "All Blogs", url: "all_blogs", icon: Package },
      { title: "All Messages", url: "all_messages", icon: Package },
    ],
  };

  const dashboardPrefix = "/dashboard";

  return (
    <Sidebar
      collapsible="icon"
      className={`${
        sidebarOpen ? "w-[260px]" : "w-[80px]"
      } bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300`}
    >
      {/* Header */}
      <SidebarHeader className="flex items-center justify-between py-4 px-4">
        <div className="flex items-center space-x-2">
          
          {sidebarOpen && <h1 className="text-2xl font-bold">Parcel Warehouse</h1>}
        </div>
        <Link href='/'><Home className="w-5 h-5 hover:opacity-75 text-black" /></Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-gray-400 uppercase tracking-wide px-4">
            Application
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items[role]?.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <SidebarMenuButton asChild>
                    <Link
                      href={`${dashboardPrefix}/${item.url}`}
                      className="flex items-center gap-3 px-3 py-2"
                    >
                      <item.icon className="w-6 h-6" />
                      <span
                        className={`${
                          sidebarOpen ? "block" : "hidden"
                        } text-sm transition-opacity duration-200 text-black`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="mt-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-gray-600">
            {/* <User className="w-5 h-5 text-white" /> */}
           
            <Avatar className={!sidebarOpen ? 'w-5 h-5' : ''}>
                <AvatarImage src='' className="w-full h-full" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            
          </div>
          {sidebarOpen && (
            <div className="text-sm">
              <p className="font-bold">Enamul</p>
              <p className="text-gray-400 text-xs">enamul@gmail.com</p>
            </div>
          )}
        </div>
        {sidebarOpen && (
          <Button 
          className="w-full mt-4 bg-red-600 hover:bg-red-500"
          onClick={()=>{signOut()}}
          >Logout</Button>
        )}
        {!sidebarOpen && (
          <LogOut 
          className="w-5 h-5 cursor-pointer text-black"
          //  onClick={handleLogOut}
           ></LogOut>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
