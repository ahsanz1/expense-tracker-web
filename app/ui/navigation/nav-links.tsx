"use client";
import Link from "next/link";
import React, { useState } from "react";
import IconButton from "../icon-button";
import MenuBars from "../icons/menu-bars";

function NavLinks() {
  const [open, setIsOpen] = useState<Boolean>(false);
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
        <div className="flex flex-col items-start gap-y-1 w-screen absolute top-12 left-0 z-10 bg-gray-100">
          <Link href={"/analytics"} className="border-b-2 p-3 w-full">
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