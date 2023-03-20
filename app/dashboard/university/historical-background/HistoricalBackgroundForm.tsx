"use client";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import {
  createHistoricalBackground,
  updateHistoricalBackground,
  useHistoricalBackground,
} from "@/store/university";
import { initTranslate, translateValidationSchima } from "@/utils/http.util";
import { ArrowPathIcon, BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: translateValidationSchima,
  description: translateValidationSchima,
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
        title: currentHistoricalBackground?.title || initTranslate,
        description: currentHistoricalBackground?.description || initTranslate,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {
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
