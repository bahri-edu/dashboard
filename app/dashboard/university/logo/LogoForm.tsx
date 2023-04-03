"use client";
import InputRadio from "@/components/InputRadio";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";

import { createLogo, updateLogo, useLogo } from "@/store/university";
import { initTranslate, translateValidationSchima } from "@/utils/http.util";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const newsSchema = Yup.object().shape({
  title: translateValidationSchima,
  description: translateValidationSchima,
});

function LogoForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentLogo, currentLogoId } = useLogo();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentLogoId && currentLogo) {
      const updateres = await dispatch(
        updateLogo({
          id: currentLogoId,
          change: e,
        })
      );

      if (updateres.type === "logo/updateLogo/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createLogo(e));

      if (res.type === "logo/createLogo/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        title: currentLogo?.title || initTranslate,
        description: currentLogo?.description || initTranslate,
      }}
      onSubmit={onSubmit}
      validationSchema={newsSchema}
    >
      {({ values }) => (
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
      )}
    </Formik>
  );
}

export default LogoForm;
