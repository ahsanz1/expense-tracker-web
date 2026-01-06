import React from "react";
import MobileNav from "./mobile-nav";
import DesktopNav from "./desktop-nav";

async function Navigation() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MobileNav className="flex flex-col justify-center py-4 md:hidden" />
        <DesktopNav className="hidden md:flex flex-row justify-between items-center py-4" />
      </div>
    </nav>
  );
}

export default Navigation;
