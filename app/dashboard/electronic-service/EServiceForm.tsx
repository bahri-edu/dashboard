"use client";
import InputRadio from "@/components/InputRadio";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import {
  createEService,
  updateEService,
  useEService,
} from "@/store/electronic-service";
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

const iconList = [
  "ri-mail-check-line",
  "ri-computer-line",
  "ri-google-line",
  "ri-search-2-line",
  "ri-file-2-line",
  "ri-sound-module-line",
  "ri-user-2-line",
  "ri-pencil-line",
  "ri-pie-chart-line",
  "ri-award-line",
  "ri-briefcase-3-line",
  "ri-calendar-check-line",
  "ri-stack-fill",
  "ri-quill-pen-line",
];

const newsSchema = Yup.object().shape({
  title: translateValidationSchima,
  url: Yup.string().required("url Required"),
  // icon: Yup.string().required("icon Required"),
});

function EserviceForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentEService, currentEServiceId } = useEService();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentEServiceId && currentEService) {
      const updateres = await dispatch(
        updateEService({
          id: currentEServiceId,
          change: e,
        })
      );

      if (updateres.type === "eService/updateEService/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createEService(e));

      if (res.type === "eService/createEService/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        title: currentEService?.title || initTranslate,
        url: currentEService?.url || "#",
        icon: currentEService?.icon || "",
      }}
      onSubmit={onSubmit}
      validationSchema={newsSchema}
    >
      {({ values }) => (
        <Form className="flex flex-col gap-4">
          <InputText name="title.ar" placeholder="Arabic Title" />
          <InputText name="title.en" placeholder="English Title" />
          <InputText name="url" placeholder="Url" />

          <div>
            <div className="flex flex-col  items-center justify-center bg-gray-100 p-5">
              <div className="mx-auto max-w-6xl px-12">
                <div className="flex flex-wrap gap-3">
                  {iconList.map((icon) => (
                    <InputRadio
                      key={icon}
                      name="icon"
                      value={icon}
                      checked={
                        icon == currentEService?.icon || values?.icon == icon
                      }
                    >
                      <i className={`${icon} text-2xl`}></i>
                    </InputRadio>
                  ))}
                </div>
              </div>
            </div>
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

export default EserviceForm;
