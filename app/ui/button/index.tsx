"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const FormButton = ({
  className,
  btnText,
  type,
}: {
  className?: string;
  btnText: string;
  type: "submit" | "reset" | "button";
}) => {
  const { pending } = useFormStatus();

  return (
    <button className={`${className} w-[70px]`} type={type} disabled={pending}>
      {pending ? (
        <div className="animate-spin rounded-full my-0 mx-auto h-[24px] w-[24px] border-t-2 border-b-2 border-white-500"></div>
      ) : (
        btnText
      )}
    </button>
  );
};

export default FormButton;
