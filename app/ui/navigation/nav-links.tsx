"use client";
import { logoutAction } from "@/app/lib/actions";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import IconButton from "../icon-button";
import MenuBars from "../icons/menu-bars";
import { usePathname } from "next/navigation";

const DRAWER_TRANSITION_MS = 400;

function NavLinks() {
  const [open, setIsOpen] = useState<boolean>(false);
  const [drawerSlideIn, setDrawerSlideIn] = useState(false);
  const [closing, setClosing] = useState(false);
  const [prevPathName, setPrevPathName] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (!prevPathName) {
      setPrevPathName(pathname);
      return;
    }
    if (pathname !== prevPathName) {
      setIsOpen(false);
      setDrawerSlideIn(false);
      setPrevPathName(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (open && !closing) {
      setDrawerSlideIn(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setDrawerSlideIn(true));
      });
      return () => cancelAnimationFrame(id);
    }
    if (!open) {
      setDrawerSlideIn(false);
    }
  }, [open, closing]);

  const handleMenuIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!open);
  };

  const closeDrawer = () => {
    if (!open) return;
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
    }, DRAWER_TRANSITION_MS);
  };

  const showOverlay = open || closing;
  const drawerEasedIn = drawerSlideIn && open && !closing;

  const overlayAndDrawer = showOverlay && (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        className="fixed inset-0 bg-black/30 transition-opacity duration-300"
        style={{
          zIndex: 9998,
          opacity: drawerEasedIn ? 1 : 0,
          pointerEvents: closing ? "none" : "auto",
        }}
        onClick={closeDrawer}
        onKeyDown={(e) => e.key === "Escape" && closeDrawer()}
      />
      <div
        className="fixed left-0 top-0 h-full w-[min(300px,85vw)] bg-white shadow-xl"
        style={{
          zIndex: 9999,
          paddingTop: "env(safe-area-inset-top)",
          transform: drawerEasedIn ? "translateX(0)" : "translateX(-100%)",
          transition: `transform ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`,
        }}
      >
            <div className="flex flex-row items-center justify-end gap-2 pr-2 pt-3 pb-2 border-b border-gray-200">
              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col pt-2">
              <Link
                href="/categories"
                className="border-b border-gray-200 p-4 text-left text-black hover:bg-gray-50 transition-colors"
                onClick={closeDrawer}
              >
                Categories
              </Link>
              <Link
                href="/analytics"
                className="border-b border-gray-200 p-4 text-left text-black hover:bg-gray-50 transition-colors"
                onClick={closeDrawer}
              >
                Analytics
              </Link>
              <button
                type="button"
                onClick={() => logoutAction()}
                className="p-4 text-left text-black hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      );

  return (
    <>
      <IconButton className="md:hidden shrink-0" onClick={handleMenuIconClick}>
        <MenuBars />
      </IconButton>
      {typeof document !== "undefined" &&
        createPortal(showOverlay ? overlayAndDrawer : null, document.body)}
      <div className="hidden md:flex flex-row justify-between gap-x-4">
        <Link 
          href={"/analytics"} 
          className="px-4 py-2 text-black hover:text-gray-600 transition-colors font-medium"
        >
          Analytics
        </Link>
        <Link 
          href={"/categories"} 
          className="px-4 py-2 text-black hover:text-gray-600 transition-colors font-medium"
        >
          Categories
        </Link>
        <button
          type="button"
          onClick={() => logoutAction()}
          className="px-4 py-2 text-black hover:text-gray-600 transition-colors font-medium"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default NavLinks;
