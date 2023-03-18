"use client";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import { createCollege, updateCollege, useCollege } from "@/store/college";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const collegeSchema = Yup.object().shape({
  nameAr: Yup.string().required("Required"),
  nameEn: Yup.string().required("Required"),
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
        nameAr: currentCollege?.nameAr || "",
        nameEn: currentCollege?.nameEn || "",
        code: currentCollege?.code || "",
        location: currentCollege?.location || "",
      }}
      onSubmit={onSubmit}
      validationSchema={collegeSchema}
    >
      {
        <Form className="flex flex-col  bg-white p-8 rounded-xl">
          {/* <h1 className="text-2xl font-bold text-gray-700 my-2">
            Add New College
          </h1> */}
          <InputText name="nameAr" placeholder="Arabic Name" />
          <InputText name="nameEn" placeholder="English Name" />
          <InputText name="code" placeholder="Code" />
          <InputTextarea name="location" rows={5} placeholder="Location" />

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
