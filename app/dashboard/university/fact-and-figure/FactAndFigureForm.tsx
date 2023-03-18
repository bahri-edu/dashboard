"use client";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import {
  createFactAndFigure,
  FactType,
  updateFactAndFigure,
  useFactAndFigure,
} from "@/store/university";
import { ArrowPathIcon, BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const newsSchema = Yup.object().shape({
  count: Yup.number()
    .typeError("count  must be a number")
    .required("count Required"),
  descriptionAr: Yup.string().required("Arabic Description  Required"),
  descriptionEn: Yup.string().required("English Descripption Required"),
  type: Yup.string().required("Fact Type Required"),
});

function FactAndFigureForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentFactAndFigure, currentFactAndFigureId } =
    useFactAndFigure();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentFactAndFigureId && currentFactAndFigure) {
      const updateres = await dispatch(
        updateFactAndFigure({
          id: currentFactAndFigureId,
          change: e,
        })
      );

      if (updateres.type === "factAndFigure/updateFactAndFigure/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createFactAndFigure(e));

      if (res.type === "factAndFigure/createFactAndFigure/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        count: currentFactAndFigure?.count || null,
        descriptionAr: currentFactAndFigure?.descriptionAr || "",
        descriptionEn: currentFactAndFigure?.descriptionEn || "",
        type: currentFactAndFigure?.type || "",
      }}
      onSubmit={onSubmit}
      validationSchema={newsSchema}
    >
      {
        <Form className="flex flex-col gap-4">
          <InputText type="number" name="count" placeholder="Count" />
          <InputTextarea
            name="descriptionAr"
            rows={5}
            placeholder="Arabic Description"
          />

          <InputTextarea
            name="descriptionEn"
            rows={5}
            placeholder="English Description"
          />

          <InputSelect
            options={[
              { value: FactType.STUDENT, text: "Student" },
              { value: FactType.STAFF, text: "Staff" },
            ]}
            name="type"
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

export default FactAndFigureForm;
