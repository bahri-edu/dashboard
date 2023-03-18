import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateVisionMission, VisionMission } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all news
 * -------------------------------------------------------
 */
export const fetchVisionMission = createAsyncThunk(
  "visionMission/fetchfetchVisionMission",
  async (): Promise<VisionMission[]> => {
    try {
      const response = await httpClient("vision-mission");

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
export const createVisionMission = createAsyncThunk(
  "visionMission/createVisionMission",
  async (news: Partial<VisionMission>): Promise<VisionMission> => {
    try {
      const response = await httpClient("vision-mission", {
        method: "POST",
        body: news,
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
export const updateVisionMission = createAsyncThunk(
  "visionMission/updateVisionMission",
  async ({ id, news }: UpdateVisionMission): Promise<VisionMission> => {
    try {
      const response = await httpClient(`vision-mission/${id}`, {
        method: "PUT",
        body: news,
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
export const deleteVisionMission = createAsyncThunk(
  "visionMission/deleteVisionMission",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`vision-mission/${id}`, { method: "DELETE" });
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
export const sortVisionMission = createAsyncThunk(
  "visionMission/sortVisionMission",
  async (sort: any): Promise<string> => {
    try {
      const res = await httpClient(`vision-mission/sort`, {
        method: "POST",
        body: { sort },
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
