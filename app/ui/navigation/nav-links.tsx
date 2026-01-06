"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import IconButton from "../icon-button";
import MenuBars from "../icons/menu-bars";
import { usePathname } from "next/navigation";

function NavLinks() {
  const [open, setIsOpen] = useState<Boolean>(false);
  const [prevPathName, setPrevPathName] = useState<String>("");
  const pathname = usePathname();

  useEffect(() => {
    if (!prevPathName) {
      setPrevPathName(pathname);
      return;
    }
    if (pathname !== prevPathName) {
      setIsOpen(false);
      setPrevPathName(pathname);
    }
  }, [pathname]);

  const handleMenuIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!open);
  };

  return (
    <>
      <IconButton className="md:hidden" onClick={handleMenuIconClick}>
        <MenuBars />
      </IconButton>
      {open && (
        <div className="flex flex-col items-start gap-y-0 w-screen absolute top-12 left-0 z-10 bg-white border-b border-gray-200 shadow-lg">
          <Link 
            href={"/categories"} 
            className="border-b border-gray-200 p-4 w-full text-black hover:bg-gray-50 transition-colors"
          >
            Categories
          </Link>
          <Link 
            href={"/analytics"} 
            className="border-b border-gray-200 p-4 w-full text-black hover:bg-gray-50 transition-colors"
          >
            Analytics
          </Link>
          <Link 
            href={"/Login"} 
            className="p-4 w-full text-black hover:bg-gray-50 transition-colors"
          >
            Login
          </Link>
        </div>
      )}
      <div className="hidden md:flex flex-row justify-between gap-x-4">
        <Link 
          href={"/analytics"} 
          className="px-4 py-2 text-black hover:text-gray-600 transition-colors font-medium"
        >
          Analytics
        </Link>
        <Link 
          href={"/categories"} 
          className="px-4 py-2 text-black hover:text-gray-600 transition-colors font-medium"
        >
          Categories
        </Link>
        <Link 
          href={"/Login"} 
          className="px-4 py-2 text-black hover:text-gray-600 transition-colors font-medium"
        >
          Login
        </Link>
      </div>
    </>
  );
}

export default NavLinks;
