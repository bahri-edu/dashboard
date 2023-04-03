import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentAdministration, UpdateCurrentAdministration } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all news
 * -------------------------------------------------------
 */
export const fetchCurrentAdministrations = createAsyncThunk(
  "currentAdministration/fetchCurrentAdministrations",
  async (): Promise<CurrentAdministration[]> => {
    try {
      const response = await httpClient("current-administration");

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
export const createCurrentAdministration = createAsyncThunk(
  "currentAdministration/createCurrentAdministration",
  async (
    message: Partial<CurrentAdministration>
  ): Promise<CurrentAdministration> => {
    try {
      const response = await httpClient("current-administration", {
        method: "POST",
        body: message,
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
export const updateCurrentAdministration = createAsyncThunk(
  "currentAdministration/updateCurrentAdministration",
  async ({
    id,
    change,
  }: UpdateCurrentAdministration): Promise<CurrentAdministration> => {
    try {
      const response = await httpClient(`current-administration/${id}`, {
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
export const deleteCurrentAdministration = createAsyncThunk(
  "currentAdministration/deleteCurrentAdministration",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`current-administration/${id}`, { method: "DELETE" });
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
// export const sortLogo = createAsyncThunk(
//   "vice-chancellor/sortLogo",
//   async (sort: any): Promise<string> => {
//     try {
//       const res = await httpClient(`logo/sort`, {
//         method: "POST",
//         body: { sort },
//       });
//       return res;
//     } catch (error: any) {
//       throw new Error(error);
//     }
//   }
// );
