"use client";
import InputFile from "@/components/InputFile";
import InputRadio from "@/components/InputRadio";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import {
  DeanshipTypeEnum,
  createDeanship,
  updateDeanship,
  useDeanship,
} from "@/store/deanship";

import {
  initTranslate,
  translateValidationSchima,
  uploadFileUrl,
} from "@/utils/http.util";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  KeyIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import DeanshipAdministrationForm from "./DeanshipAdministrationForm";
import DeanshipAdministration from "./DeanshipAdministration";

const validationSchema = Yup.object().shape({
  title: translateValidationSchima,
});

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
  "ri-eye-fill",
  "ri-checkbox-circle-fill",
];

function DeanshipForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentDeanship, currentDeanshipId } = useDeanship();

  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentDeanshipId && currentDeanship) {
      const updateres = await dispatch(
        updateDeanship({
          id: currentDeanshipId,
          change: e,
        })
      );

      if (updateres.type === "deanship/updateDeanship/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createDeanship(e));

      if (res.type === "deanship/createDeanship/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          title: currentDeanship?.title || initTranslate,
          descriptions: currentDeanship?.descriptions || [initTranslate],
          icon: currentDeanship?.icon || "",
          image: currentDeanship?.image || "",
          deanshipType:
            currentDeanship?.deanshipType ||
            DeanshipTypeEnum.DEANSHIPOFLIBRARIES,
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <InputText name="title.ar" placeholder="Arabic Title" />

            <InputText name="title.en" placeholder="English Title" />

            <div className="col-span-full">
              <FieldArray name="descriptions">
                {({ insert, remove, push }) => (
                  <div className="flex  flex-col gap-2 border-dashed border rounded-md p-5">
                    <span className="text-gray-300">descriptions</span>
                    {values?.descriptions?.length > 0 &&
                      values.descriptions.map((desc, index) => (
                        <div
                          key={`desc-${index}`}
                          className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center  border-dashed border rounded-md p-5 bg-gray-100 "
                        >
                          <div className="col-span-11 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Field
                                as="textarea"
                                name={`descriptions.${index}.ar`}
                                placeholder={`arabic description ${index + 1}`}
                                rows={5}
                                className="w-full peer-hover:border-red-200"
                              />
                            </div>

                            <div>
                              <Field
                                as="textarea"
                                name={`descriptions.${index}.en`}
                                placeholder={`english description ${index + 1}`}
                                rows={5}
                                className="w-full"
                              />
                            </div>
                          </div>

                          <div className="col">
                            <TrashIcon
                              onClick={() => remove(index)}
                              className="w-6 h-6 cursor-pointer hover:scale-110 hover:text-red-400 transition-all duration-200 peer"
                            />
                          </div>
                        </div>
                      ))}
                    <div>
                      <button
                        type="button"
                        className="btn bg-brand-50 text-brand-600"
                        onClick={() => push("")}
                      >
                        <PlusIcon className="w-6 h-6" />
                        Add New paragraph
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="col-span-full">
              <div className="flex flex-col  items-center justify-center bg-gray-100 p-5">
                <div className="mx-auto max-w-6xl px-12">
                  <div className="flex flex-wrap gap-3">
                    {iconList.map((icon) => (
                      <InputRadio
                        key={icon}
                        name="icon"
                        value={icon}
                        checked={
                          icon == currentDeanship?.icon || values?.icon == icon
                        }
                      >
                        <i className={`${icon} text-2xl`}></i>
                      </InputRadio>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full flex gap-2">
              <InputFile onUpload={(url) => setFieldValue("image", url)} />

              {values?.image && (
                <img
                  className="w-12 h-12 rounded-full"
                  src={uploadFileUrl + values?.image}
                  alt="image"
                />
              )}
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
    </>
  );
}

export default DeanshipForm;
