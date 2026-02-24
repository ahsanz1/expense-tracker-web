import React from "react";
import NavLinks from "./nav-links";
import Link from "next/link";
import SearchInput from "../search-input";

function DesktopNav({
  className,
}: Readonly<{
  className: string;
}>) {
  return (
    <div className={`${className} gap-4`}>
      <Link href="/" className="text-2xl font-semibold text-black hover:text-gray-700 transition-colors shrink-0">
        Expense Tracker
      </Link>
      <div className="min-w-0 flex-1 max-w-sm">
        <SearchInput />
      </div>
      <NavLinks />
    </div>
  );
}

export default DesktopNav;
