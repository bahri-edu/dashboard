"use client";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import {
  createHistoricalBackground,
  updateHistoricalBackground,
  useHistoricalBackground,
} from "@/store/university";
import { ArrowPathIcon, BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const newsSchema = Yup.object().shape({
  titleAr: Yup.string().required("Arabic title Required"),
  titleEn: Yup.string().required("English title Required"),
  descriptionAr: Yup.string().required("Arabic Description  Required"),
  descriptionEn: Yup.string().required("English Descripption Required"),
});

function HistoricalBackgroundForm({
  setClose,
}: {
  setClose(close: boolean): void;
}) {
  const {
    loading,
    currentHistoricalBackground,
    currentHistoricalBackgroundId,
  } = useHistoricalBackground();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentHistoricalBackgroundId && currentHistoricalBackground) {
      const updateres = await dispatch(
        updateHistoricalBackground({
          id: currentHistoricalBackgroundId,
          change: e,
        })
      );

      if (
        updateres.type === "historicalBackground/updateHistoricalBackground"
      ) {
        setClose(false);
      }
    } else {
      const res = await dispatch(createHistoricalBackground(e));

      if (
        res.type === "historicalBackground/createHistoricalBackground/fulfilled"
      ) {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        titleAr: currentHistoricalBackground?.titleAr || "",
        titleEn: currentHistoricalBackground?.titleEn || "",
        descriptionAr: currentHistoricalBackground?.descriptionAr || "",
        descriptionEn: currentHistoricalBackground?.descriptionEn || "",
      }}
      onSubmit={onSubmit}
      validationSchema={newsSchema}
    >
      {
        <Form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <InputText name="titleAr" placeholder="Arabic Title" />
            <InputTextarea
              name="descriptionAr"
              rows={10}
              placeholder="Arabic Content"
            />
          </div>

          <div>
            <InputText name="titleEn" placeholder="English Title" />

            <InputTextarea
              name="descriptionEn"
              rows={10}
              placeholder="English Content"
            />
          </div>

          <div>
            <button type="submit" className="btn btn--primary gap-1">
              {loading && <ArrowPathIcon className="w-5 animate-spin" />}
              <BookmarkSquareIcon className="w-5" />
              Save
            </button>
          </div>
        </Form>
      }
    </Formik>
  );
}

export default HistoricalBackgroundForm;
