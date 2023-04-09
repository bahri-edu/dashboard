"use client";
import InputFile from "@/components/InputFile";
import InputRadio from "@/components/InputRadio";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import { fetchColleges, useCollege } from "@/store/college";

import { createStaff, updateStaff, useStaff } from "@/store/staff";

import { initTranslate, translateValidationSchima } from "@/utils/http.util";
import { iconList, socialIcons } from "@/utils/icons.util";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  possison: translateValidationSchima,
  name: translateValidationSchima,
});

function StaffForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentStaff, currentStaffId } = useStaff();

  const { colleges } = useCollege();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchColleges());
  }, []);

  const onSubmit = async (e: any) => {
    if (currentStaffId && currentStaff) {
      const updateres = await dispatch(
        updateStaff({
          id: currentStaffId,
          change: e,
        })
      );

      if (updateres.type === "staff/updateStaff/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createStaff(e));

      if (res.type === "staff/createStaff/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        possison: currentStaff?.possison || initTranslate,
        name: currentStaff?.name || initTranslate,

        awardsAndgrants: currentStaff?.awardsAndgrants || [],
        educationAndExperience: currentStaff?.educationAndExperience || [],
        internationalConferencesAndCourses:
          currentStaff?.internationalConferencesAndCourses || [],
        workshops: currentStaff?.workshops || [],
        qualifications: currentStaff?.qualifications || [],

        socials: currentStaff?.socials || [],
        phone: currentStaff?.phone || "",
        email: currentStaff?.email || "",
        collegeId: currentStaff?.collegeId || "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <InputText name="name.ar" placeholder="Arabic name" />
          <InputText name="name.en" placeholder="English name" />

          <InputText name="possison.ar" placeholder="Arabic possion" />
          <InputText name="possison.en" placeholder="English possion" />

          <InputText name="phone" placeholder="Phone" />
          <InputText name="email" placeholder="Email" />

          <label htmlFor=""></label>

          <InputSelect
            name="collegeId"
            label="College"
            options={[
              ...colleges.map(({ name, id }, x) => ({
                value: id,
                text: name?.en,
              })),
            ]}
          />

          <div className="col-span-full">
            <FieldArray name="awardsAndgrants">
              {({ insert, remove, push }) => (
                <div className="flex  flex-col gap-2 border-dashed border rounded-md p-5">
                  <span className="text-gray-300">awards And grants</span>
                  {values?.awardsAndgrants?.length > 0 &&
                    values.awardsAndgrants.map((desc, index) => (
                      <div
                        key={`desc-${index}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center  border-dashed border rounded-md p-5 bg-gray-100 "
                      >
                        <div className="col-span-11 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Field
                              name={`awardsAndgrants.${index}.ar`}
                              placeholder={` arabic ${index + 1}`}
                              className="w-full"
                              type="text"
                            />
                          </div>

                          <div>
                            <Field
                              name={`awardsAndgrants.${index}.en`}
                              placeholder={` english ${index + 1}`}
                              className="w-full"
                              type="text"
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
                      Add New awards And grants
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
          </div>

          <div className="col-span-full">
            <FieldArray name="educationAndExperience">
              {({ insert, remove, push }) => (
                <div className="flex  flex-col gap-2 border-dashed border rounded-md p-5">
                  <span className="text-gray-300">
                    Education And Experience
                  </span>
                  {values?.educationAndExperience?.length > 0 &&
                    values.educationAndExperience.map((desc, index) => (
                      <div
                        key={`desc-${index}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center  border-dashed border rounded-md p-5 bg-gray-100 "
                      >
                        <div className="col-span-11 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Field
                              name={`educationAndExperience.${index}.ar`}
                              placeholder={` arabic ${index + 1}`}
                              className="w-full"
                              type="text"
                            />
                          </div>

                          <div>
                            <Field
                              name={`educationAndExperience.${index}.en`}
                              placeholder={` english ${index + 1}`}
                              className="w-full"
                              type="text"
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
                      Add New Education And Experience
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
          </div>

          <div className="col-span-full">
            <FieldArray name="internationalConferencesAndCourses">
              {({ insert, remove, push }) => (
                <div className="flex  flex-col gap-2 border-dashed border rounded-md p-5">
                  <span className="text-gray-300">
                    International Conferences And Courses
                  </span>
                  {values?.internationalConferencesAndCourses?.length > 0 &&
                    values.internationalConferencesAndCourses.map(
                      (desc, index) => (
                        <div
                          key={`desc-${index}`}
                          className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center  border-dashed border rounded-md p-5 bg-gray-100 "
                        >
                          <div className="col-span-11 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Field
                                name={`internationalConferencesAndCourses.${index}.ar`}
                                placeholder={`arabic ${index + 1}`}
                                className="w-full"
                                type="text"
                              />
                            </div>

                            <div>
                              <Field
                                name={`internationalConferencesAndCourses.${index}.en`}
                                placeholder={`english ${index + 1}`}
                                className="w-full"
                                type="text"
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
                      )
                    )}
                  <div>
                    <button
                      type="button"
                      className="btn bg-brand-50 text-brand-600"
                      onClick={() => push("")}
                    >
                      <PlusIcon className="w-6 h-6" />
                      Add New International Conference And Course
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
          </div>

          <div className="col-span-full">
            <FieldArray name="workshops">
              {({ insert, remove, push }) => (
                <div className="flex  flex-col gap-2 border-dashed border rounded-md p-5">
                  <span className="text-gray-300">Workshops</span>
                  {values?.workshops?.length > 0 &&
                    values.workshops.map((desc, index) => (
                      <div
                        key={`desc-${index}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center  border-dashed border rounded-md p-5 bg-gray-100 "
                      >
                        <div className="col-span-11 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Field
                              name={`workshops.${index}.ar`}
                              placeholder={`arabic ${index + 1}`}
                              className="w-full"
                              type="text"
                            />
                          </div>

                          <div>
                            <Field
                              name={`workshops.${index}.en`}
                              placeholder={`english ${index + 1}`}
                              className="w-full"
                              type="text"
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
                      Add New Workshop
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
          </div>

          <div className="col-span-full">
            <FieldArray name="qualifications">
              {({ insert, remove, push }) => (
                <div className="flex  flex-col gap-2 border-dashed border rounded-md p-5">
                  <span className="text-gray-300">Qualifications</span>
                  {values?.qualifications?.length > 0 &&
                    values.qualifications.map((desc, index) => (
                      <div
                        key={`desc-${index}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center  border-dashed border rounded-md p-5 bg-gray-100 "
                      >
                        <div className="col-span-11 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Field
                              name={`qualifications.${index}.ar`}
                              placeholder={`arabic ${index + 1}`}
                              className="w-full"
                              type="text"
                            />
                          </div>

                          <div>
                            <Field
                              name={`qualifications.${index}.en`}
                              placeholder={`english ${index + 1}`}
                              className="w-full"
                              type="text"
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
                      Add New Qualification
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
          </div>

          <div className="col-span-full">
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

export default StaffForm;
