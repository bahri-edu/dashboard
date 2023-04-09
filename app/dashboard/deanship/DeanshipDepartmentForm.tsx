"use client";
import InputFile from "@/components/InputFile";
import InputRadio from "@/components/InputRadio";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import {
  createDeanshipDepartment,
  updateDeanshipDepartment,
  useDeanshipDepartment,
} from "@/store/deanship";

import { initTranslate, translateValidationSchima } from "@/utils/http.util";
import { iconList, socialIcons } from "@/utils/icons.util";
import { ArrowPathIcon, BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: translateValidationSchima,
});

function DeanshipDepartmentForm({
  setClose,
  deanshipType,
}: {
  setClose(close: boolean): void;
  deanshipType: string;
}) {
  const { loading, currentDeanshipDepartment, currentDeanshipDepartmentId } =
    useDeanshipDepartment();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    console.log(e);
    if (currentDeanshipDepartmentId && currentDeanshipDepartment) {
      const updateres = await dispatch(
        updateDeanshipDepartment({
          id: currentDeanshipDepartmentId,
          change: e,
        })
      );

      if (updateres.type === "deanship/updateDeanshipDepartment/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createDeanshipDepartment(e));

      if (res.type === "deanship/createDeanshipDepartment/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        title: currentDeanshipDepartment?.title || initTranslate,
        description: currentDeanshipDepartment?.description || initTranslate,
        icon: currentDeanshipDepartment?.icon || "",
        url: currentDeanshipDepartment?.url || "",
        deanshipType: deanshipType,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <InputText name="title.ar" placeholder="Arabic title" />
          <InputText name="title.en" placeholder="English title" />

          <InputTextarea
            name="description.ar"
            placeholder="Arabic description"
          />
          <InputTextarea
            name="description.en"
            placeholder="English description"
          />

          <div className="col-span-2">
            <div className="flex flex-col  items-center justify-center bg-gray-100 p-5">
              <div className="mx-auto max-w-6xl px-12">
                <div className="flex flex-wrap gap-3">
                  {iconList.map((icon) => (
                    <InputRadio
                      key={icon}
                      name="icon"
                      value={icon}
                      checked={
                        icon == currentDeanshipDepartment?.icon ||
                        values?.icon == icon
                      }
                    >
                      <i className={`${icon} text-2xl`}></i>
                    </InputRadio>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <InputText name="url" placeholder="url" />
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

export default DeanshipDepartmentForm;
