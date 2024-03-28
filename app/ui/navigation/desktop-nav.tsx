import React from "react";
import NavLinks from "./nav-links";

function DesktopNav({
  className,
}: Readonly<{
  className: string;
}>) {
  return (
    <div className={className}>
      <h2>Expense Tracker</h2>
      <NavLinks />
    </div>
  );
}

export default DesktopNav;
