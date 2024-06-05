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
  const date = new Date()
    .toLocaleString("default", {
      month: "short",
      year: "numeric",
    })
    .toLowerCase()
    .replaceAll(" ", "-");
  return (
    <>
      <IconButton className="md:hidden" onClick={handleMenuIconClick}>
        <MenuBars />
      </IconButton>
      {open && (
        <div className="flex flex-col items-start gap-y-1 w-screen absolute top-12 left-0 z-10 bg-gray-100">
          <Link href={"/category/new"} className="border-b-2 p-3 w-full">
            New Category
          </Link>{" "}
          <Link href={`/analytics/${date}`} className="border-b-2 p-3 w-full">
            Analytics
          </Link>{" "}
          <Link href={"/Login"} className="border-b-2 p-3 w-full">
            Login
          </Link>
        </div>
      )}
      <div className="hidden md:flex flex-row justify-between gap-x-2 bg-gray-100">
        <Link href={"/analytics"} className="p-3">
          Analytics
        </Link>{" "}
        <Link href={"/Login"} className="p-3">
          Login
        </Link>
      </div>
    </>
  );
}

export default NavLinks;
