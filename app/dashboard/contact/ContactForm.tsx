"use client";
import InputRadio from "@/components/InputRadio";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import { createContact, updateContact, useContact } from "@/store/contact";
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
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  KeyIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
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

const validationSchema = Yup.object().shape({
  titleAr: Yup.string().required("Arabic title Required"),
  titleEn: Yup.string().required("English title Required"),
  // icon: Yup.string().required("icon Required"),
});

function ContactForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentContact, currentContactId } = useContact();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentContactId && currentContact) {
      const updateres = await dispatch(
        updateContact({
          id: currentContactId,
          change: e,
        })
      );

      if (updateres.type === "contact/updateContact/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createContact(e));

      if (res.type === "contact/createContact/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        location: {
          ar: currentContact?.location?.ar,
          en: currentContact?.location?.en,
        },
        email: currentContact?.email,
        phone: [""],

        socials: [
          {
            icon: "",
            url: "",
          },
        ],
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form className="flex flex-col gap-4">
          <InputText name="location.ar" placeholder="Arabic location" />
          <InputText name="location.en" placeholder="English location" />
          <InputText name="email" placeholder="email " />
          <InputText name="fax" placeholder="fax " />

          {/* <FieldArray name="phone">
            {({ insert, remove, push }) => (
              <div className="flex flex-col gap-2">
                {values.phone.map((p, x) => (
                  <div
                    className="flex items-center gap-1"
                    key={crypto.randomUUID()}
                  >
                    <InputText
                      name={`phone.${x}`}
                      placeholder={`phone ${x + 1}`}
                    />
                    <TrashIcon
                      onClick={() => remove(x)}
                      className="w-4 h-4 cursor-pointer hover:scale-110 hover:text-red-400"
                    />
                  </div>
                ))}

                <div>
                  <button
                    className="btn bg-brand-50 text-brand-600"
                    onClick={() => push("")}
                  >
                    + add phon
                  </button>
                </div>
              </div>
            )}
          </FieldArray> */}

          {/* <FieldArray name="socials">
            {({ insert, remove, push }) => (
              <div className="flex flex-col gap-2">
                {values.socials.map((s, x) => (
                  <div
                    className="flex items-center gap-1"
                    key={crypto.randomUUID()}
                  >
                    <Field
                      name={`socials.${x}.icon`}
                      placeholder={`icon ${x + 1}`}
                      type="text"
                    />
                    <Field
                      name={`socials.${x}.url`}
                      placeholder={`url ${x + 1}`}
                      type="text"
                    />
                    <TrashIcon
                      onClick={() => remove(x)}
                      className="w-4 h-4 cursor-pointer hover:scale-110 hover:text-red-400"
                    />
                  </div>
                ))}

                <div>
                  <button
                    className="btn bg-brand-50 text-brand-600"
                    onClick={() =>
                      push({
                        icon: "",
                        url: "",
                      })
                    }
                  >
                    + add phon
                  </button>
                </div>
              </div>
            )}
          </FieldArray> */}

          <FieldArray name="friends">
            {({ insert, remove, push }) => (
              <div>
                {values.socials.length > 0 &&
                  values.socials.map((socia, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <Field
                          name={`socials.${index}.icon`}
                          placeholder="icon"
                          type="text"
                        />
                      </div>
                      <div className="col">
                        <Field
                          name={`socials.${index}.url`}
                          placeholder="jurl"
                          type="email"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ icon: "", url: "" })}
                >
                  Add Friend
                </button>
              </div>
            )}
          </FieldArray>

          <div>
            <div className="flex flex-col  items-center justify-center bg-gray-100 p-5">
              <div className="mx-auto max-w-6xl px-12">
                <div className="flex flex-wrap gap-3">
                  {/* {iconList.map((icon) => (
                    <InputRadio
                      key={icon}
                      name="icon"
                      value={icon}
                      checked={
                        icon == currentContact?.    || values?.icon == icon
                      }
                    >
                      <i className={`${icon} text-2xl`}></i>
                    </InputRadio>
                  ))} */}
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

export default ContactForm;
