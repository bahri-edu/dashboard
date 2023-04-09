"use client";
import InputFile from "@/components/InputFile";
import InputRadio from "@/components/InputRadio";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import {
  DeanshipTypeEnum,
  createDeanship,
  createDeanshipAdministration,
  updateDeanship,
  updateDeanshipAdministration,
  useDeanship,
  useDeanshipAdministration,
} from "@/store/deanship";

import {
  initTranslate,
  translateValidationSchima,
  uploadFileUrl,
} from "@/utils/http.util";
import { socialIcons } from "@/utils/icons.util";
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

const validationSchema = Yup.object().shape({
  possison: translateValidationSchima,
  name: translateValidationSchima,
});

function DeanshipAdministrationForm({
  setClose,
  deanshipType,
}: {
  setClose(close: boolean): void;
  deanshipType: string;
}) {
  const {
    loading,
    currentDeanshipAdministration,
    currentDeanshipAdministrationId,
  } = useDeanshipAdministration();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentDeanshipAdministrationId && currentDeanshipAdministrationId) {
      const updateres = await dispatch(
        updateDeanshipAdministration({
          id: currentDeanshipAdministrationId,
          change: e,
        })
      );

      if (
        updateres.type === "deanship/updateDeanshipAdministration/fulfilled"
      ) {
        setClose(false);
      }
    } else {
      const res = await dispatch(createDeanshipAdministration(e));

      if (res.type === "deanship/createDeanshipAdministration/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        possison: currentDeanshipAdministration?.possison || initTranslate,
        name: currentDeanshipAdministration?.name || initTranslate,
        degree: currentDeanshipAdministration?.degree || initTranslate,
        email: currentDeanshipAdministration?.email || "",
        phone: currentDeanshipAdministration?.phone || "",
        image: currentDeanshipAdministration?.image || "",
        socials: currentDeanshipAdministration?.socials || [],
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
          <InputText name="possison.ar" placeholder="Arabic Possison" />
          <InputText name="possison.en" placeholder="English Possison" />

          <InputText name="name.ar" placeholder="Arabic Name" />
          <InputText name="name.en" placeholder="English Name" />

          <InputText name="degree.ar" placeholder="Arabic degree" />
          <InputText name="degree.en" placeholder="English degree" />

          <InputText name="email" placeholder="ُEmail" />
          <InputText name="phone" placeholder="Phone" />

          <FieldArray name="socials">
            {({ insert, remove, push }) => (
              <div className="flex flex-col gap-2 border-dashed border rounded-md p-5">
                <span className="text-gray-300">Social Media</span>
                {values.socials.length > 0 &&
                  values.socials.map((s, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <div className="col">
                        <Field
                          className="appearance-none"
                          as="select"
                          name={`socials.${index}.icon`}
                          placeholder="icon"
                        >
                          {socialIcons.map((icon) => (
                            <option key={icon.icon} value={icon.icon}>
                              {icon.name}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="col">
                        <Field
                          name={`socials.${index}.url`}
                          placeholder="jurl"
                          type="text"
                        />
                      </div>
                      <div className="col">
                        <TrashIcon
                          onClick={() => remove(index)}
                          className="w-6 h-6 cursor-pointer hover:scale-110 hover:text-red-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                  ))}
                <div>
                  <button
                    type="button"
                    className="btn bg-brand-50 text-brand-600 "
                    onClick={() => push({ icon: "ri-facebook-fil", url: "" })}
                  >
                    <PlusIcon className="w-6 h-6" />
                    Add Social Media
                  </button>
                </div>
              </div>
            )}
          </FieldArray>

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
  );
}

export default DeanshipAdministrationForm;
