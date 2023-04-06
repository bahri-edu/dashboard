import * as Yup from "yup";

//const baseUrl = "http://164.92.186.47:4000/api/";
const baseUrl = "http://localhost:4000/api/";

export const uploadFileUrl = "http://164.92.186.47:4004/";
// export const uploadFileUrl = "http://localhost:4004/";

export interface HttpRequestOptions {
  method?: string;
  body?: any;
}

export const httpClient = async (url: string, options?: HttpRequestOptions) => {
  const token = localStorage.getItem("token");

  const response = await fetch(baseUrl + url, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(options?.body && { body: JSON.stringify(options.body) }),
  });

  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(
      data?.errors?.map((r: any) => r.message)?.toString() || "server error"
    );
  }

  return Promise.resolve(data);
};

export const uploadSingleFile = async (file: File) => {
  const fd = new FormData();

  fd.append("file", file);
  const response = await fetch(uploadFileUrl + "upload", {
    method: "POST",
    body: fd,
  });

  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(
      data?.errors?.map((r: any) => r.message)?.toString() || "server error"
    );
  }
  return Promise.resolve(data);
};

export interface Translate {
  en: string;
  ar: string;
}

export const initTranslate: Translate = {
  en: "",
  ar: "",
};

export const translateValidationSchima = Yup.object().shape({
  ar: Yup.string().required("Required"),
  en: Yup.string().required("Required"),
});
