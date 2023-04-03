import InputFile from "@/components/InputFile";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { useAppDispatch } from "@/store";
import {
  createCurrentAdministration,
  CurrentPositionTypeEnum,
  updateCurrentAdministration,
  useCurrentAdministration,
} from "@/store/administration";
import {
  initTranslate,
  translateValidationSchima,
  uploadFileUrl,
} from "@/utils/http.util";
import { socialIcons } from "@/utils/icons.util";
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
  name: translateValidationSchima,
  positionType: Yup.string().required("Required"),
});

function CurrentAdminstrationForm({
  setClose,
}: {
  setClose(close: boolean): void;
}) {
  const { loading, currentAdministration, currentAdministrationId } =
    useCurrentAdministration();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    console.log(e);
    if (currentAdministrationId && currentAdministration) {
      const updateres = await dispatch(
        updateCurrentAdministration({
          id: currentAdministrationId,
          change: e,
        })
      );

      if (
        updateres.type ===
        "currentAdministration/updateCurrentAdministration/fulfilled"
      ) {
        setClose(false);
      }
    } else {
      const res = await dispatch(createCurrentAdministration(e));

      if (
        res.type ===
        "currentAdministration/createCurrentAdministration/fulfilled"
      ) {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        name: currentAdministration?.name || initTranslate,
        email: currentAdministration?.email || "",
        phone: currentAdministration?.phone || "",
        birthdate: currentAdministration?.birthdate || "",
        imageUrl: currentAdministration?.imageUrl || "",
        position: currentAdministration?.position || initTranslate,
        degree: currentAdministration?.degree || initTranslate,
        qualifications: currentAdministration?.qualifications || [
          initTranslate,
        ],
        socials: currentAdministration?.socials || [
          { icon: "ri-facebook-fil", url: "" },
        ],
        positionType: currentAdministration?.positionType || "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputText name="name.ar" placeholder="Arabic Name" />
          <InputText name="name.en" placeholder="English Name" />
          <InputText name="email" placeholder="email" />
          <InputText name="phone" placeholder="phone" />
          <InputText name="birthdate" placeholder="Birthdate" type="date" />

          <div className="flex gap-3">
            {currentAdministration?.imageUrl && (
              <img
                src={`${uploadFileUrl}${currentAdministration?.imageUrl}`}
                alt="image"
                className="w-20 h-20 rounded-full"
              />
            )}
            <InputFile
              onUpload={(url) => setFieldValue("imageUrl", url)}
              label="Image"
            />
          </div>

          <InputText name="position.ar" placeholder="Arabic Position" />
          <InputText name="position.en" placeholder="English Position" />

          <InputText name="degree.ar" placeholder="Arabic Degree" />
          <InputText name="degree.en" placeholder="English Degree" />

          <div className="col-span-full">
            <FieldArray name="qualifications">
              {({ insert, remove, push }) => (
                <div className="flex  flex-col gap-2 border-dashed border rounded-md p-5">
                  <span className="text-gray-300">Qualifications</span>
                  {values?.qualifications?.length > 0 &&
                    values.qualifications.map((qual, index) => (
                      <div
                        key={`qualifications-${index}`}
                        className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center  "
                      >
                        <div className="col-span-5">
                          <Field
                            name={`qualifications.${index}.ar`}
                            placeholder={`Arabic Qualification ${index + 1}`}
                            rows={5}
                            className="w-full peer-hover:border-red-200"
                            type="text"
                          />
                          <ErrorMessage
                            name={`qualifications.${index}.ar`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col-span-5">
                          <Field
                            name={`qualifications.${index}.en`}
                            placeholder={`English Qualification ${index + 1}`}
                            rows={5}
                            className="w-full"
                            type="text"
                          />
                          <ErrorMessage
                            name={`description.${index}.en`}
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
                      onClick={() =>
                        push({
                          ar: "",
                          en: "",
                        })
                      }
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

          <div className="col-span-full">
            <InputSelect
              label="Position Type"
              name="positionType"
              options={[
                {
                  text: "VICE CHANCELLOR",
                  value: CurrentPositionTypeEnum.VICE_CHANCELLOR,
                },
                {
                  text: "DEPUTY VICE CHANCELLOR",
                  value: CurrentPositionTypeEnum.DEPUTY_VICE_CHANCELLOR,
                },
                {
                  text: "PRINCIPAL",
                  value: CurrentPositionTypeEnum.PRINCIPAL,
                },
                {
                  text: "SECRETARY OF SCIENTIFIC AFFAIRS",
                  value:
                    CurrentPositionTypeEnum.SECRETARY_OF_SCIENTIFIC_AFFAIRS,
                },
              ]}
            />
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

export default CurrentAdminstrationForm;
