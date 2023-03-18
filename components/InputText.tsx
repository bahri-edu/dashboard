"use client";
import React from "react";
import { useField } from "formik";

function InputText({ label, ...props }: any) {
  const [field, meta] = useField(props);

  const { error, touched } = meta;
  return (
    <>
      <input
        className="
        block
        w-full
        rounded-md
        bg-gray-100
        border-transparent
        focus:border-gray-500 focus:bg-white focus:ring-0"
        {...field}
        {...props}
        type={props?.type || "text"}
      />
    </>
  );
}

export default InputText;
