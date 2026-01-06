"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const FormButton = ({
  className,
  btnText,
  type,
  variant = "primary",
}: {
  className?: string;
  btnText: string;
  type: "submit" | "reset" | "button";
  variant?: "primary" | "secondary";
}) => {
  const { pending } = useFormStatus();

  const baseStyles = variant === "primary" 
    ? "bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
    : "bg-white text-black border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed";

  return (
    <button 
      className={`${baseStyles} ${className || ""} px-4 py-2 rounded-md font-medium transition-colors min-w-[70px]`} 
      type={type} 
      disabled={pending}
    >
      {pending ? (
        <div className="animate-spin rounded-full my-0 mx-auto h-[20px] w-[20px] border-2 border-current border-t-transparent"></div>
      ) : (
        btnText
      )}
    </button>
  );
};

export default FormButton;
