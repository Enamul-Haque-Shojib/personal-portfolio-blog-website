


"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type UserProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const Navbar = ({ session }: { session: UserProps | null }) => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-white tracking-wider">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
        {["Home", "Projects", "Blogs", "Contact"].map((item) => (
          <Link
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
            className="hover:text-yellow-300 transition text-white"
          >
            {item}
          </Link>
        ))}


          {session ? (
            <div className="relative flex items-center space-x-4">
              <Link href="/dashboard" className="hover:text-yellow-300 transition text-white">
                Dashboard
              </Link>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center focus:outline-none">
                    <Image src={session.user?.image || "/default-avatar.png"} alt="User" width={35} height={35} className="rounded-full border-2 border-white cursor-pointer" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white shadow-md rounded-md w-48">
                  <div className="px-4 py-2">
                    <p className="font-semibold">{session.user?.name || "User"}</p>
                    <p className="text-sm text-gray-500">{session.user?.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-200">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="block px-4 py-2 text-red-600 hover:bg-gray-200">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link href="/register">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Register</Button>
              </Link>
              <Link href="/login">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Login</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden text-white">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white text-black">
            <div className="flex flex-col space-y-6 mt-4">
              {["Home", "Projects", "Blogs", "Contact"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-lg hover:text-indigo-500">
                  {item}
                </Link>
              ))}

              {session ? (
                <>
                  <Link href="/dashboard" className="text-lg hover:text-indigo-500">
                    Dashboard
                  </Link>
                  <button onClick={() => signOut()} className="text-lg text-red-600 hover:text-red-800 flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/register" className="text-lg hover:text-indigo-500">
                    Register
                  </Link>
                  <Link href="/login" className="text-lg hover:text-indigo-500">
                    Login
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
