import { useField } from "formik";
import React from "react";

function InputRadio({ children, ...props }: any) {
  const [field, meta] = useField(props);

  const { error, touched } = meta;
  return (
    <>
      <label className="cursor-pointer">
        <input type="radio" className="peer sr-only" {...field} {...props} />
        <div className="flex items-center justify-center   rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-brand-600 peer-checked:ring-brand-400 peer-checked:ring-offset-2">
          {children}
        </div>
      </label>
    </>
  );
}

export default InputRadio;
