"use client";
import React from "react";
import { uploadSingleFile } from "@/utils/http.util";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function InputFile({
  onUpload,
  label,
}: {
  onUpload(url: string): void;
  label?: string;
}) {
  const [uploading, setUploading] = React.useState(false);
  const handleUploadFile = async (e: any) => {
    const file = e.target.files[0];

    setUploading(true);

    try {
      const res = await uploadSingleFile(file);
      onUpload(res?.file);
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  if (uploading)
    return (
      <div className="rounded-xl text-brand-700">
        <ArrowPathIcon className="w-6 h-6 animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-gray-400 ">{label}</label>}
      <input
        type="file"
        className="
         text-slate-500 text-sm leading-5 file:mr-6 file:px-4 file:py-2 file:rounded-xl
         file:text-brand-700 file:font-semibold file:border-none hover:file:bg-brand-100
       "
        onChange={handleUploadFile}
      />
    </div>
  );
}

export default InputFile;
