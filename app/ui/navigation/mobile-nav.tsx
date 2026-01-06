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
      <div className="flex flex-row justify-between gap-x-2 items-center">
        <Link href="/" className="flex items-center">
          <h3 className="text-xl font-semibold text-black">
            Expense Tracker
          </h3>
        </Link>
        <SearchInput />
        <NavLinks />
      </div>
    </div>
  );
}

export default MobileNav;
