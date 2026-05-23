"use client";
import React from "react";

function IconButton({
  className,
  onClick,
  children,
  disabled,
}: Readonly<{
  className?: string;
  onClick: (e: React.MouseEvent, idx?: number) => void;
  children: React.ReactNode;
  disabled?: boolean;
}>) {
  return (
    <button className={className} onClick={onClick} disabled={disabled} type="button">
      {children}
    </button>
  );
}

export default IconButton;
