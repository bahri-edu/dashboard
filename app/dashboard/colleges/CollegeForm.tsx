"use client";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import { createCollege, updateCollege, useCollege } from "@/store/college";
import { initTranslate } from "@/utils/http.util";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.object().shape({
    ar: Yup.string().required("Required"),
    en: Yup.string().required("Required"),
  }),
  location: Yup.object().shape({
    ar: Yup.string().required("Required"),
    en: Yup.string().required("Required"),
  }),
  code: Yup.string().min(2, "Too Short!").required("Required"),
});

function CollegeForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading } = useCollege();

  const dispatch = useAppDispatch();

  const { currentCollege, currentCollegeId } = useCollege();

  const onSubmit = async (e: any) => {
    if (currentCollegeId && currentCollege) {
      const updateres = await dispatch(
        updateCollege({
          id: currentCollegeId,
          college: e,
        })
      );

      if (updateres.type === "college/updateCollege/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createCollege(e));

      if (res.type === "college/createCollege/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        name: currentCollege?.name || initTranslate,
        location: currentCollege?.location || initTranslate,
        code: currentCollege?.code || "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {
        <Form className="flex flex-col  bg-white p-8 rounded-xl">
          {/* <h1 className="text-2xl font-bold text-gray-700 my-2">
            Add New College
          </h1> */}
          <InputText name="name.ar" placeholder="Arabic Name" />
          <InputText name="name.en" placeholder="English Name" />
          <InputText name="code" placeholder="Code" />
          <InputTextarea
            name="location.ar"
            rows={5}
            placeholder="Arabic Location"
          />
          <InputTextarea
            name="location.en"
            rows={5}
            placeholder="English Location"
          />

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

export default CollegeForm;
