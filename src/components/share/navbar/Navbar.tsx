"use client"
import Image from 'next/image';
import styles from './Navbar.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { LogOut, Menu, X } from 'lucide-react';

type UserProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }
}
const Navbar = ({session}:{session:UserProps | null}) => {
  
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
 
    
  
    const handleNavField = () => setOpen(!open);
  
    const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  
    return (
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md text-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold tracking-wider">
            Portfolio
          </Link>
  
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className={`transition duration-300 hover:text-yellow-300 ${styles.active}`}
              // activeclassName="text-yellow-300"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`transition duration-300 hover:text-yellow-300 ${styles.active}`}
              // activeclassName="text-yellow-300"
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className={`transition duration-300 hover:text-yellow-300 ${styles.active}`}
              // activeclassName="text-yellow-300"
            >
              Blogs
            </Link>
            <Link
              href="/contact"
              className={`transition duration-300 hover:text-yellow-300 ${styles.active}`}
              // activeclassName="text-yellow-300"
            >
              Contact Me
            </Link>
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="transition duration-300 hover:text-yellow-300"
                  // activeclassName="text-yellow-300"
                >
                  Dashboard
                </Link>
                <div className="relative">
                  <Image
                    src={session?.user?.image || "https://via.placeholder.com/40"}
                    alt="User"
                    width={35}
                    height={35}
                    onClick={toggleDropdown}
                    className="rounded-full border-2 border-white cursor-pointer"
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                      <div className="px-4 py-2">
                        <p className="font-semibold">{session?.user?.name || "User"}</p>
                        {/* <p className="text-sm text-gray-500">{role}</p> */}
                      </div>
                      <hr />
                      <Link
                        href="/dashboard"
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      >
                        Dashboard
                      </Link>
                      <hr />
                      <button
                        onClick={()=>{signOut()}}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full transition duration-300"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full transition duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
  
          {/* Mobile Navigation Button */}
          <button
            className="lg:hidden text-2xl focus:outline-none"
            onClick={handleNavField}
          >
            {open ? <X
          className="w-5 h-5 cursor-pointer text-black text-2xl"
           ></X> : <Menu
          className="w-5 h-5 cursor-pointer text-white text-2xl"
           ></Menu>}
          </button>
        </div>
  
        {/* Mobile Navigation */}
        <div
          className={`lg:hidden bg-white text-black fixed inset-0 transition-transform duration-300 z-40 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <button className="text-2xl mb-4 focus:outline-none" onClick={handleNavField}>
            <X
          className="w-5 h-5 cursor-pointer text-black"
           ></X>
            </button>
            <div className="space-y-4">
              <Link
                href="/"
                className="block text-lg hover:text-indigo-500"
                // activeclassName="text-indigo-500"
                onClick={handleNavField}
              >
                Home
              </Link>
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block w-full text-lg px-4 py-2 hover:bg-gray-200"
                    onClick={handleNavField}
                  >
                    Dashboard
                  </Link>
                  <button
                    // onClick={handleLogOut}
                    className="block w-full text-lg px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="block text-lg hover:text-indigo-500"
                    // activeclassName="text-indigo-500"
                    onClick={handleNavField}
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="block text-lg hover:text-indigo-500"
                    // activeclassName="text-indigo-500"
                    onClick={handleNavField}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Navbar;