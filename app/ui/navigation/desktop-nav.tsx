import React from "react";
import NavLinks from "./nav-links";
import Link from "next/link";

function DesktopNav({
  className,
}: Readonly<{
  className: string;
}>) {
  return (
    <div className={className}>
      <Link href="/" className="text-2xl font-semibold text-black hover:text-gray-700 transition-colors">
        Expense Tracker
      </Link>
      <NavLinks />
    </div>
  );
}

export default DesktopNav;
