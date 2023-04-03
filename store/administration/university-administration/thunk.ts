import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  UniversityAdministration,
  UpdateUniversityAdministration,
} from "./model";

/**
 * -------------------------------------------------------
 *  fetch all
 * -------------------------------------------------------
 */
export const fetchUniversityAdministrations = createAsyncThunk(
  "administration/fetchUniversityAdministrations",
  async (): Promise<UniversityAdministration[]> => {
    try {
      const response = await httpClient("university-administration");

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
/**
 * -------------------------------------------------------
 *  create
 * -------------------------------------------------------
 */
export const createUniversityAdministration = createAsyncThunk(
  "administration/createUniversityAdministration",
  async (
    message: Partial<UniversityAdministration>
  ): Promise<UniversityAdministration> => {
    try {
      const response = await httpClient("university-administration", {
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
 *  update
 * -------------------------------------------------------
 */
export const updateUniversityAdministration = createAsyncThunk(
  "administration/updateUniversityAdministration",
  async ({
    id,
    change,
  }: UpdateUniversityAdministration): Promise<UniversityAdministration> => {
    try {
      const response = await httpClient(`university-administration/${id}`, {
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
 *  delete
 * -------------------------------------------------------
 */
export const deleteUniversityAdministration = createAsyncThunk(
  "administration/deleteUniversityAdministration",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`university-administration/${id}`, { method: "DELETE" });
      return id;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

/**
 * -------------------------------------------------------
 *    sort
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
