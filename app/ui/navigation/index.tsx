import React from "react";
import MobileNav from "./mobile-nav";
import DesktopNav from "./desktop-nav";

async function Navigation() {
  return (
    <div className="bg-gray-100 p-3">
      <MobileNav className="flex flex-col justify-center my-3 md:hidden" />
      <DesktopNav className="hidden md:flex flex-row justify-between items-center" />
      </div>
  );
}

export default Navigation;
