import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateUploadFile, UploadFile } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all news
 * -------------------------------------------------------
 */
export const fetchUploadFiles = createAsyncThunk(
  "uploadFile/fetchUploadFiles",
  async (): Promise<UploadFile[]> => {
    try {
      const response = await httpClient("upload-files");

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
/**
 * -------------------------------------------------------
 *  create  news
 * -------------------------------------------------------
 */
export const createUploadFile = createAsyncThunk(
  "uploadFile/createUploadFile",
  async (data: Partial<UploadFile>): Promise<UploadFile> => {
    try {
      const response = await httpClient("upload-files", {
        method: "POST",
        body: data,
      });

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

/**
 * -------------------------------------------------------
 *  update  news
 * -------------------------------------------------------
 */
export const updateUploadFile = createAsyncThunk(
  "uploadFile/updateUploadFile",
  async ({ id, change }: UpdateUploadFile): Promise<UploadFile> => {
    try {
      const response = await httpClient(`upload-files/${id}`, {
        method: "PUT",
        body: change,
      });

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

/**
 * -------------------------------------------------------
 *  delete  news
 * -------------------------------------------------------
 */
export const deleteUploadFile = createAsyncThunk(
  "uploadFile/deleteUploadFile",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`upload-files/${id}`, { method: "DELETE" });
      return id;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

/**
 * -------------------------------------------------------
 *    sort Vision Mission
 * -------------------------------------------------------
 */
export const sortUploadFile = createAsyncThunk(
  "uploadFile/sortUploadFile",
  async (sort: any): Promise<string> => {
    try {
      const res = await httpClient(`upload-files/sort`, {
        method: "POST",
        body: { sort },
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
