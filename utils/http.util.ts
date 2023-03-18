// const baseUrl = "https://website-api-le8m.onrender.com/api/";
const baseUrl = "http://localhost:4000/api/";

export const uploadFileUrl = "https://upload-service.onrender.com/";

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
