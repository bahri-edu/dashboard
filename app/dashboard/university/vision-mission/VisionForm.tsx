"use client";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import {
  createVisionMission,
  updateVisionMission,
  useVisionMission,
} from "@/store/university";
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

function VisionForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentVisionMission, currentVisionMissionId } =
    useVisionMission();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentVisionMissionId && currentVisionMission) {
      const updateres = await dispatch(
        updateVisionMission({
          id: currentVisionMissionId,
          news: e,
        })
      );

      if (updateres.type === "visionMission/updateVisionMission/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createVisionMission(e));

      if (res.type === "visionMission/createVisionMission/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        title: currentVisionMission?.title || initTranslate,
        description: currentVisionMission?.description || initTranslate,
      }}
      onSubmit={onSubmit}
      validationSchema={newsSchema}
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

export default VisionForm;
