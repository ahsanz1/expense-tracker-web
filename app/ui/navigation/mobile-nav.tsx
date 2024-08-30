import React from "react";
import NavLinks from "./nav-links";
import Link from "next/link";
import SearchInput from "../search-input";

function MobileNav({
  className,
}: Readonly<{
  className: string;
}>) {
  return (
    <div className={className}>
      <div className="flex flex-row justify-between items-center">
        <Link href="/">
          <h3 className="hidden text-xl font-semibold md:block">
            Expense Tracker
          </h3>
          <img
            src="favicon.ico"
            className="w-9 h-9 md:hidden"
          ></img>
        </Link>
        <SearchInput />
        <NavLinks />
      </div>
    </div>
  );
}

export default MobileNav;
