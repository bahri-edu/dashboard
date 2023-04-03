"use client";
import InputFile from "@/components/InputFile";
import InputRadio from "@/components/InputRadio";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";

import {
  createUploadFile,
  updateUploadFile,
  useUploadFile,
} from "@/store/university";
import {
  initTranslate,
  translateValidationSchima,
  uploadFileUrl,
} from "@/utils/http.util";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { url } from "inspector";
import React, { useState } from "react";
import * as Yup from "yup";

const newsSchema = Yup.object().shape({
  title: translateValidationSchima,
  url: Yup.string().required("Required"),
});

function UploadFileForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentUploadFile, currentUploadFileId } = useUploadFile();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    console.log(e);
    if (currentUploadFileId && currentUploadFile) {
      const updateres = await dispatch(
        updateUploadFile({
          id: currentUploadFileId,
          change: e,
        })
      );

      if (updateres.type === "uploadFile/updateUploadFile/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createUploadFile(e));

      if (res.type === "uploadFile/createUploadFile/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        title: currentUploadFile?.title || initTranslate,
        url: currentUploadFile?.url || "",
      }}
      onSubmit={onSubmit}
      validationSchema={newsSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-4">
          <InputText name="title.ar" placeholder="Arabic Title" />

          <InputText name="title.en" placeholder="English Title" />
          <InputFile onUpload={(url) => setFieldValue("url", url)} />

          {currentUploadFile && currentUploadFile?.url && (
            <img
              src={uploadFileUrl + currentUploadFile?.url}
              alt="image"
              className="w-20"
            />
          )}

          <div>
            <button type="submit" className="btn btn--primary gap-1">
              {loading && <ArrowPathIcon className="w-5 animate-spin" />}
              <BookmarkSquareIcon className="w-5" />
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default UploadFileForm;
