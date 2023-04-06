import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Council, CouncilTypeEnum, UpdateCouncil } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all
 * -------------------------------------------------------
 */
export const fetchCouncils = createAsyncThunk(
  "university/fetchCouncils",
  async (councilType?: CouncilTypeEnum): Promise<Council[]> => {
    const url = councilType ? `council?councilType=${councilType}` : "council";
    try {
      const response = await httpClient(url);

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
export const createCouncil = createAsyncThunk(
  "university/createCouncil",
  async (council: Partial<Council>): Promise<Council> => {
    try {
      const response = await httpClient("council", {
        method: "POST",
        body: council,
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
export const updateCouncil = createAsyncThunk(
  "university/updateCouncil",
  async ({ id, change }: UpdateCouncil): Promise<Council> => {
    try {
      const response = await httpClient(`council/${id}`, {
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
export const deleteCouncil = createAsyncThunk(
  "university/deleteCouncil",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`council/${id}`, { method: "DELETE" });
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
// export const sortVisionMission = createAsyncThunk(
//   "visionMission/sortVisionMission",
//   async (sort: any): Promise<string> => {
//     try {
//       const res = await httpClient(`vision-mission/sort`, {
//         method: "POST",
//         body: { sort },
//       });
//       return res;
//     } catch (error: any) {
//       throw new Error(error);
//     }
//   }
// );
