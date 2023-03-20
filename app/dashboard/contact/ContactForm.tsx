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
  PlusIcon,
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

const icons: { icon: string; name: string }[] = [
  {
    icon: "ri-facebook-fill",
    name: "facebook",
  },
  {
    icon: "ri-youtube-fill",
    name: "youtube",
  },
  {
    icon: "ri-linkedin-fill",
    name: "linkedin",
  },
  {
    icon: "ri-instagram-fill",
    name: "instagram",
  },
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
        phone: currentContact?.phone || [],

        socials: currentContact?.socials || [
          {
            icon: "ri-facebook-fil",
            url: "",
          },
        ],
      }}
      onSubmit={onSubmit}
      // validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form className="flex flex-col gap-4">
          <InputTextarea name="location.ar" placeholder="Arabic location" />
          <InputTextarea name="location.en" placeholder="English location" />
          <InputText name="email" placeholder="email " />
          <InputText name="fax" placeholder="fax " />

          <FieldArray name="phone">
            {({ insert, remove, push }) => (
              <div className="flex  flex-col gap-2 border-dashed border rounded-md p-5">
                <span className="text-gray-300">Phons</span>
                {values.phone.length > 0 &&
                  values.phone.map((friend, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <div>
                        <Field
                          name={`phone.${index}`}
                          placeholder={`phone ${index + 1}`}
                          type="text"
                        />
                        <ErrorMessage
                          name={`phone.${index}`}
                          component="div"
                          className="field-error"
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
                    className="btn bg-brand-50 text-brand-600"
                    onClick={() => push("")}
                  >
                    <PlusIcon className="w-6 h-6" />
                    Add Phone
                  </button>
                </div>
              </div>
            )}
          </FieldArray>

          <FieldArray name="socials">
            {({ insert, remove, push }) => (
              <div className="flex flex-col gap-2 border-dashed border rounded-md p-5">
                <span className="text-gray-300">Social Media</span>
                {values.socials.length > 0 &&
                  values.socials.map((socia, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <div className="col">
                        <Field
                          className="appearance-none"
                          as="select"
                          name={`socials.${index}.icon`}
                          placeholder="icon"
                        >
                          {icons.map((icon) => (
                            <option key={crypto.randomUUID()} value={icon.icon}>
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
