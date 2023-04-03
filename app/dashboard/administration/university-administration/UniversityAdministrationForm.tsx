import InputRadio from "@/components/InputRadio";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import {
  createUniversityAdministration,
  updateUniversityAdministration,
  useUniversityAdministration,
} from "@/store/administration";
import { initTranslate, translateValidationSchima } from "@/utils/http.util";
import { iconList } from "@/utils/icons.util";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  unit: translateValidationSchima,
  introduction: translateValidationSchima,
});

function UniversityAdministrationForm({
  setClose,
}: {
  setClose(close: boolean): void;
}) {
  const {
    loading,
    currentUniversityAdministration,
    currentUniversityAdministrationId,
  } = useUniversityAdministration();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    console.log(e);
    if (currentUniversityAdministrationId && currentUniversityAdministration) {
      const updateres = await dispatch(
        updateUniversityAdministration({
          id: currentUniversityAdministrationId,
          change: e,
        })
      );

      if (
        updateres.type ===
        "administration/updateUniversityAdministration/fulfilled"
      ) {
        setClose(false);
      }
    } else {
      const res = await dispatch(createUniversityAdministration(e));

      if (
        res.type === "administration/createUniversityAdministration/fulfilled"
      ) {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        unit: currentUniversityAdministration?.unit || initTranslate,
        introduction:
          currentUniversityAdministration?.introduction || initTranslate,
        info: currentUniversityAdministration?.info || [],
        staff: currentUniversityAdministration?.staff || [],
        staffTitle:
          currentUniversityAdministration?.staffTitle || initTranslate,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputText name="unit.ar" placeholder="Arabic unit" />
          <InputText name="unit.en" placeholder="English unit" />
          <InputTextarea
            name="introduction.ar"
            placeholder="Arabic introduction"
            rows={5}
          />
          <InputTextarea
            name="introduction.en"
            placeholder="English introduction"
            rows={5}
          />

          <div className="col-span-full">
            <FieldArray name="info">
              {({ insert, remove, push }) => (
                <div className="flex  flex-col gap-5 border-dashed border rounded-md p-5 ">
                  <span className="text-gray-300">info</span>
                  {values?.info?.length > 0 &&
                    values.info.map((inf, index) => (
                      <div
                        key={`info-${index}`}
                        className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center  bg-gray-100 rounded-md p-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 col-span-3">
                          <Field
                            name={`info.${index}.title.ar`}
                            placeholder={`Arabic title ${index + 1}`}
                            rows={5}
                            className="w-full peer-hover:border-red-200"
                            type="text"
                          />

                          <Field
                            name={`info.${index}.title.en`}
                            placeholder={`English description ${index + 1}`}
                            rows={5}
                            className="w-full"
                            type="text"
                          />

                          <Field
                            as="textarea"
                            name={`info.${index}.description.ar`}
                            placeholder={`Arabic description ${index + 1}`}
                            rows={5}
                            className="w-full peer-hover:border-red-200"
                            type="text"
                          />

                          <Field
                            as="textarea"
                            name={`info.${index}.description.en`}
                            placeholder={`English description ${index + 1}`}
                            rows={5}
                            className="w-full"
                            type="text"
                          />

                          <div className="col-span-2">
                            <div className="flex flex-col  items-center justify-center bg-gray-100 p-5">
                              <div className="mx-auto max-w-6xl px-12">
                                <div className="flex flex-wrap gap-3">
                                  {iconList.map((icon) => (
                                    <InputRadio
                                      key={icon}
                                      name={`info.${index}.icon`}
                                      value={icon}
                                      checked={
                                        icon === values?.info?.[index]?.icon
                                      }
                                    >
                                      <i className={`${icon} text-xl`}></i>
                                    </InputRadio>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col ">
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
                      className="btn bg-brand-50 text-brand-600 mt-2"
                      onClick={() =>
                        push({
                          title: {
                            ar: "",
                            en: "",
                          },
                          description: {
                            ar: "",
                            en: "",
                          },
                          icon: "",
                        })
                      }
                    >
                      <PlusIcon className="w-6 h-6 " />
                      Add New Info
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
          </div>

          <InputText name="staffTitle.ar" placeholder="Arabic staff Title" />
          <InputText name="staffTitle.en" placeholder="English staff Title" />

          <div className="col-span-full">
            <FieldArray name="staff">
              {({ insert, remove, push }) => (
                <div className="flex  flex-col gap-5 border-dashed border rounded-md p-5">
                  <span className="text-gray-300">staff</span>
                  {values?.staff?.length > 0 &&
                    values.staff.map((stf, index) => (
                      <div
                        key={`staff-${index}`}
                        className="grid grid-cols-1 md:grid-cols-4 gap-5 items-center bg-gray-100 rounded-md p-4  "
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-3 ">
                          <Field
                            name={`staff.${index}.name.ar`}
                            placeholder={`Arabic Staff Name ${index + 1}`}
                            className="w-full peer-hover:border-red-200"
                            type="text"
                          />

                          <Field
                            name={`staff.${index}.name.en`}
                            placeholder={`English Staff Name ${index + 1}`}
                            className="w-full"
                            type="text"
                          />

                          <Field
                            name={`staff.${index}.position.ar`}
                            placeholder={`Arabic Staff Position ${index + 1}`}
                            className="w-full peer-hover:border-red-200"
                            type="text"
                          />

                          <Field
                            name={`staff.${index}.position.en`}
                            placeholder={`English Staff Position ${index + 1}`}
                            className="w-full"
                            type="text"
                          />

                          <Field
                            name={`staff.${index}.email`}
                            placeholder={`Staff Email ${index + 1}`}
                            className="w-full peer-hover:border-red-200"
                            type="text"
                          />

                          <Field
                            name={`staff.${index}.phone`}
                            placeholder={`Staff Phone ${index + 1}`}
                            className="w-full"
                            type="text"
                          />
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
                      onClick={() =>
                        push({
                          name: {
                            ar: "",
                            en: "",
                          },
                          position: {
                            ar: "",
                            en: "",
                          },
                          email: "",
                          phone: "",
                        })
                      }
                    >
                      <PlusIcon className="w-6 h-6" />
                      Add New Staff
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
export default UniversityAdministrationForm;
