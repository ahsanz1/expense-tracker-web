import React from "react";
import NavLinks from "./nav-links";
import Link from "next/link";

function MobileNav({
  className,
}: Readonly<{
  className: string;
}>) {
  return (
    <div className={className}>
      <div className="flex flex-row justify-between items-center">
        <Link href="/">
          <h3 className="text-xl font-semibold">Expense Tracker</h3>
        </Link>
        <NavLinks />
      </div>
    </div>
  );
}

export default MobileNav;
