import React from "react";

function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-4">
      {children}
    </main>
  );
}

export default Layout;
