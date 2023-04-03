"use client";
import React from "react";
import { useField } from "formik";

function InputSelect({ options = [], label, ...props }: any) {
  const [field, meta] = useField(props);

  const { error, touched } = meta;
  return (
    <div className="flex flex-col gap-1">
      {(label && <label className="text-gray-400 ">{label}</label>) ||
        (props?.placeholder && (
          <label className="text-gray-400 ">{props.placeholder}</label>
        ))}
      <select
        className="
        block
        w-full
        rounded-md
        bg-gray-100
        border-transparent
        focus:border-gray-500
        focus:bg-white focus:ring-0"
        {...field}
        {...props}
      >
        {options && options?.length ? (
          options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          ))
        ) : (
          <option value=""></option>
        )}
      </select>
      <div className="h-6">
        {error && touched ? (
          <span className="text-red-600 transition transform  motion-reduce:transition-none ">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default InputSelect;
