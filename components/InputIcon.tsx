"use client";
import React from "react";
import { useField } from "formik";

function InputText({ label, ...props }: any) {
  const [field, meta] = useField(props);

  const iconList = [
    "ri-mail-check-line",
    "ri-computer-line",
    "ri-google-line",
    "ri-search-2-line",
    "ri-file-2-line",
    "ri-sound-module-line",
    "ri-user-2-line",
    "ri-pencil-line",
  ];

  const { error, touched } = meta;
  return (
    <>
      {/* <div className="flex flex-wrap gap-4">
        {iconList.map((icon) => (
          <i
            onClick={() => field.onChange()}
            className={`${icon} ri-3x bg-gray-100 p-2 rounded-full`}
          ></i>
        ))}
      </div> */}
      {/* <input
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
      <div className="h-6">
        {error && touched ? (
          <span className="text-red-600 transition transform  motion-reduce:transition-none ">
            {error}
          </span>
        ) : null}
      </div> */}
    </>
  );
}

export default InputText;
