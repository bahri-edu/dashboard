import InputText from "@/components/InputText";
import { useAppDispatch } from "@/store";
import { createCouncil, updateCouncil, useCouncil } from "@/store/university";
import { initTranslate, translateValidationSchima } from "@/utils/http.util";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: translateValidationSchima,
});

function CouncilForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentCouncil, currentCouncilId } = useCouncil();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentCouncilId && currentCouncil) {
      const updateres = await dispatch(
        updateCouncil({
          id: currentCouncilId,
          change: e,
        })
      );

      if (updateres.type === "university/updateCouncil/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createCouncil(e));

      if (res.type === "university/createCouncil/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        title: currentCouncil?.title || initTranslate,
        descriptions: currentCouncil?.descriptions || [
          { ar: "", en: "", lists: [] },
        ],
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                              placeholder={`descriptions ${index + 1}`}
                              rows={5}
                              className="w-full peer-hover:border-red-200"
                            />
                            <ErrorMessage
                              name={`descriptions.${index}.en`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div>
                            <Field
                              as="textarea"
                              name={`descriptions.${index}.en`}
                              placeholder={`description ${index + 1}`}
                              rows={5}
                              className="w-full"
                            />
                            <ErrorMessage
                              name={`descriptions.${index}.en`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="col-span-full bg-gray-200 p-5 rounded-md">
                            <FieldArray name={`descriptions.${index}.lists`}>
                              {({ insert, remove, push }) => (
                                <div className="">
                                  <span className="text-gray-500">
                                    list inside description
                                  </span>
                                  {values?.descriptions?.[index]?.lists &&
                                    values?.descriptions?.[index]?.lists?.map(
                                      (lis, x) => (
                                        <div
                                          key={`desc-lists-${index}`}
                                          className="grid grid-cols-1 md:grid-cols-12 items-center border-dashed border rounded-md p-5"
                                        >
                                          <div className="col-span-11 grid grid-cols-1 md:grid-cols-2 gap-3 ">
                                            <Field
                                              name={`descriptions.${index}.lists.${x}.title.ar`}
                                              placeholder={`descriptions ${
                                                index + 1
                                              } list ${x + 1} arabic title`}
                                              className="w-full peer-hover:border-red-200 "
                                              type="text"
                                            />

                                            <Field
                                              name={`descriptions.${index}.lists.${x}.title.en`}
                                              placeholder={`descriptions ${
                                                index + 1
                                              } list ${x + 1} english title`}
                                              rows={5}
                                              className="w-full"
                                              type="text"
                                            />

                                            <Field
                                              as="textarea"
                                              name={`descriptions.${index}.lists.${x}.description.ar`}
                                              placeholder={`descriptions ${
                                                index + 1
                                              } list ${
                                                x + 1
                                              } arabic description`}
                                              rows={5}
                                              className="w-full peer-hover:border-red-200"
                                            />

                                            <Field
                                              as="textarea"
                                              name={`descriptions.${index}.lists.${x}.description.en`}
                                              placeholder={`descriptions ${
                                                index + 1
                                              } list ${
                                                x + 1
                                              } english description`}
                                              rows={5}
                                              className="w-full"
                                            />
                                          </div>

                                          <div>
                                            <TrashIcon
                                              onClick={() => remove(x)}
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
                                      Add New list
                                    </button>
                                  </div>
                                </div>
                              )}
                            </FieldArray>
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

export default CouncilForm;
