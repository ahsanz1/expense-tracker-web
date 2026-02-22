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
      <div className="grid grid-cols-[auto_minmax(140px,1fr)_auto] items-center gap-x-2 w-full">
        <NavLinks />
        <Link href="/" className="min-w-0 flex justify-center overflow-hidden">
          <h3 className="text-base sm:text-xl font-semibold text-black truncate" title="Expense Tracker">
            Expense Tracker
          </h3>
        </Link>
        <div className="min-w-0 overflow-hidden">
          <SearchInput />
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
