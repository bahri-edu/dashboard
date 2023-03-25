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
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.object().shape({
    ar: Yup.string().required("Required"),
    en: Yup.string().required("Required"),
  }),
  introduction: Yup.object().shape({
    ar: Yup.string().required("Required"),
    en: Yup.string().required("Required"),
  }),
  // code: Yup.string().min(2, "Too Short!").required("Required"),
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
        introduction: currentCollege?.introduction || initTranslate,
        code: currentCollege?.code || "",
        info: {
          vision: currentCollege?.info?.vision || initTranslate,
          academicQualification:
            currentCollege?.info?.academicQualification || initTranslate,
          bachelorProgram:
            currentCollege?.info?.bachelorProgram || initTranslate,
          registrationStep:
            currentCollege?.info?.registrationStep || initTranslate,
          collegeDepartment: currentCollege?.info?.collegeDepartment || [
            initTranslate,
          ],
        },
        counter: {
          student: currentCollege?.counter?.student,
          department: currentCollege?.counter?.department,
          staff: currentCollege?.counter?.staff,
        },
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form className="flex flex-col gap-4 bg-white p-8 rounded-xl ">
          <div className="border border-dashed p-4 rounded-lg">
            <span className="text-gray-300">Name</span>
            <div className="grid  md:grid-cols-2 gap-4">
              <InputText
                name="name.ar"
                placeholder="Arabic Name"
                label="arabic name"
              />
              <InputText
                name="name.en"
                placeholder="English Name"
                label="english name"
              />
            </div>
          </div>

          <div className="border border-dashed p-4 rounded-lg">
            <span className="text-gray-300">Introduction</span>
            <div className="grid  md:grid-cols-2 gap-4">
              <InputTextarea
                name="introduction.ar"
                rows={5}
                placeholder="Arabic introduction"
                label="Arabic introduction"
              />
              <InputTextarea
                name="introduction.en"
                rows={5}
                placeholder="English introduction"
                label="English introduction"
              />
            </div>
          </div>

          <div className="border border-dashed p-4 rounded-lg">
            <span className="text-gray-300">Info</span>
            <div className="grid  md:grid-cols-2 gap-4">
              <InputTextarea
                name="info.vision.ar"
                placeholder="Arabic vision"
                rows={5}
              />
              <InputTextarea
                name="info.vision.en"
                placeholder="English vision"
                rows={5}
              />

              <InputTextarea
                name="info.academicQualification.ar"
                placeholder="Arabic Academic Qualification"
                rows={5}
              />
              <InputTextarea
                name="info.academicQualification.en"
                placeholder="English Academic Qualification"
                rows={5}
              />

              <InputTextarea
                name="info.bachelorProgram.ar"
                placeholder="Arabic Bachelor Program"
                rows={5}
              />
              <InputTextarea
                name="info.bachelorProgram.en"
                placeholder="English Bachelor Program"
                rows={5}
              />
              <InputTextarea
                name="info.registrationStep.ar"
                placeholder="Arabic Registration Step"
                rows={5}
              />
              <InputTextarea
                name="info.registrationStep.en"
                placeholder="English Registration Step"
                rows={5}
              />
            </div>
          </div>

          <FieldArray name="info.collegeDepartment">
            {({ insert, remove, push }) => (
              <div className="flex  flex-col gap-2 border-dashed border rounded-md p-5">
                <span className="text-gray-300">College Department</span>
                {values.info.collegeDepartment.length > 0 &&
                  values.info.collegeDepartment.map((friend, index) => (
                    <div className="grid  md:grid-cols-2 gap-4" key={index}>
                      <div className="flex items-center">
                        <Field
                          className="w-full"
                          name={`info.collegeDepartment.${index}.ar`}
                          placeholder={`arabic  Department ${index + 1}`}
                          type="text"
                        />
                      </div>

                      <div className="flex items-center">
                        <Field
                          className="w-full"
                          name={`info.collegeDepartment.${index}.en`}
                          placeholder={`English  Department ${index + 1}`}
                          type="text"
                        />

                        <div className="col">
                          <TrashIcon
                            onClick={() => remove(index)}
                            className="w-6 h-6 cursor-pointer hover:scale-110 hover:text-red-400 transition-all duration-200"
                          />
                        </div>
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
                    Add Department
                  </button>
                </div>
              </div>
            )}
          </FieldArray>

          <div className="border border-dashed p-4 rounded-lg">
            <span className="text-gray-300">Counter</span>
            <div className="grid  md:grid-cols-2 gap-4">
              <InputText
                name="counter.student"
                type="number"
                placeholder="Counter Student"
              />
              <InputText
                name="counter.department"
                type="number"
                placeholder="Counter Department"
              />

              <InputText
                name="counter.staff"
                type="number"
                placeholder="Counter Staff"
              />
            </div>
          </div>

          <InputText name="code" placeholder="Code" />

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

export default CollegeForm;
