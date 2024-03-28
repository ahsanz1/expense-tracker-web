"use client";
import React from "react";

function IconButton({
  className,
  onClick,
  children,
}: Readonly<{
  className: string;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}>) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
