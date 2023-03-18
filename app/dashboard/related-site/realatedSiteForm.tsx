"use client";
import InputFile from "@/components/InputFile";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import { createNews, NewsTypeEnum, updateNews, useNews } from "@/store/news";
import {
  createRelatedSite,
  updateRelatedSite,
  useRelatedSite,
} from "@/store/related-site";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { url } from "inspector";
import React, { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  text: Yup.object().shape({
    ar: Yup.string().required("Arabic title Required"),
    en: Yup.string().required("English title Required"),
  }),
  url: Yup.string().required("url  Required"),
});

function RealatedSiteForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentRelatedSite, currentRelatedSiteId } =
    useRelatedSite();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentRelatedSiteId && currentRelatedSite) {
      const updateres = await dispatch(
        updateRelatedSite({
          id: currentRelatedSiteId,
          change: e,
        })
      );

      if (updateres.type === "relatedSite/updateRelatedSite/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createRelatedSite(e));

      if (res.type === "relatedSite/createRelatedSite/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        text: {
          ar: currentRelatedSite?.text?.ar || "",
          en: currentRelatedSite?.text?.en || "",
        },
        url: currentRelatedSite?.url || "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setValues, values }) => (
        <Form className="flex flex-col gap-4">
          <InputText name="text.en" placeholder="English Title" />
          <InputText name="text.ar" placeholder="Arabic Title" />

          <InputText name="url" placeholder="Url" />

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

export default RealatedSiteForm;
