"use client";
import React from "react";
import { useField } from "formik";

function InputTextarea({ label, ...props }: any) {
  const [field, meta] = useField(props);

  const { error, touched } = meta;
  return (
    <div>
      {(label && <label className="text-gray-400 ">{label}</label>) ||
        (props?.placeholder && (
          <label className="text-gray-400 ">{props.placeholder}</label>
        ))}
      <textarea
        className="
        block
        w-full
        rounded-md
        bg-gray-100
        border-transparent
        focus:border-gray-500 focus:bg-white focus:ring-0"
        {...field}
        {...props}
      />
      <div className="h-4">
        {error && touched ? (
          <span className="text-red-600 transition transform  motion-reduce:transition-none ">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default InputTextarea;
