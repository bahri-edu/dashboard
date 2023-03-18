import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EService, UpdateEService } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all
 * -------------------------------------------------------
 */
export const fetchEServices = createAsyncThunk(
  "eService/fetchEServices",
  async (): Promise<EService[]> => {
    try {
      const response = await httpClient("electronic-service");

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
export const createEService = createAsyncThunk(
  "eService/createEService",
  async (news: Partial<EService>): Promise<EService> => {
    try {
      const response = await httpClient("electronic-service", {
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
 *  update
 * -------------------------------------------------------
 */
export const updateEService = createAsyncThunk(
  "eService/updateEService",
  async ({ id, change }: UpdateEService): Promise<EService> => {
    try {
      const response = await httpClient(`electronic-service/${id}`, {
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
export const deleteEService = createAsyncThunk(
  "eService/deleteEService",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`electronic-service/${id}`, { method: "DELETE" });
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
export const sortEServices = createAsyncThunk(
  "eService/sortEServices",
  async (sort: any): Promise<string> => {
    try {
      const res = await httpClient(`electronic-service/sort`, {
        method: "POST",
        body: { sort },
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
