"use client";
import InputFile from "@/components/InputFile";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import { createNews, NewsTypeEnum, updateNews, useNews } from "@/store/news";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.object().shape({
    ar: Yup.string().required("Arabic title Required"),
    en: Yup.string().required("english title Required"),
  }),
  description: Yup.object().shape({
    ar: Yup.string().required("Arabic description Required"),
    en: Yup.string().required("english description Required"),
  }),
});

function NewsForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentNews, currentNewsId } = useNews();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentNewsId && currentNews) {
      const updateres = await dispatch(
        updateNews({
          id: currentNewsId,
          news: e,
        })
      );

      if (updateres.type === "news/updateNews/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createNews(e));

      if (res.type === "news/createNews/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        title: currentNews?.title || { ar: "", en: "" },
        description: currentNews?.description || { ar: "", en: "" },
        type: currentNews?.type || NewsTypeEnum.GENERAL,
        images: currentNews?.images || [],
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setValues, values }) => (
        <Form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <InputText name="title.ar" placeholder="Arabic Title" />
            <InputTextarea
              name="description.ar"
              rows={10}
              placeholder="Arabic Content"
            />
          </div>

          <div>
            <InputText name="title.en" placeholder="English Title" />

            <InputTextarea
              name="description.en"
              rows={10}
              placeholder="English Content"
            />
          </div>

          <InputSelect
            name="type"
            label="Type"
            options={[
              {
                text: "General",
                value: NewsTypeEnum.GENERAL,
              },
              {
                text: "Academic",
                value: NewsTypeEnum.ACADEMIC,
              },
              {
                text: "Careers",
                value: NewsTypeEnum.CAREERS,
              },
            ]}
          />

          <InputFile
            label="Image"
            onUpload={(url) => setValues({ ...values, images: [url] })}
          />

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

export default NewsForm;
