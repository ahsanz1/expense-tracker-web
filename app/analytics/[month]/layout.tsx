import ToastifyContainer from "@/app/ui/toast-container";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4">
      {children}
      <ToastifyContainer />
    </main>
  );
}

export default Layout;
