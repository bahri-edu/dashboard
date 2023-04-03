import InputText from "@/components/InputText";
import { useAppDispatch } from "@/store";
import {
  createMessage,
  updateMessage,
  useViceChancellorMessage,
} from "@/store/administration";
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

function MessageForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentMessage, currentMessageId } =
    useViceChancellorMessage();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentMessageId && currentMessage) {
      const updateres = await dispatch(
        updateMessage({
          id: currentMessageId,
          change: e,
        })
      );

      if (updateres.type === "vice-chancellor/updateMessage/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createMessage(e));

      if (res.type === "vice-chancellor/createMessage/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        title: currentMessage?.title || initTranslate,
        descriptions: currentMessage?.descriptions || [initTranslate],
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
                  <span className="text-gray-300">description</span>
                  {values?.descriptions?.length > 0 &&
                    values.descriptions.map((desc, index) => (
                      <div
                        key={`desc-${index}`}
                        className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center  "
                      >
                        <div className="col-span-5">
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

                        <div className="col-span-5">
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

export default MessageForm;
