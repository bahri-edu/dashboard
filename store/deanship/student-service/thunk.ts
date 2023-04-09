import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeanshipStudentService, UpdateDeanshipStudentService } from "./model";
import { DeanshipTypeEnum } from "..";

/**
 * -------------------------------------------------------
 *  fetch all
 * -------------------------------------------------------
 */
export const fetchDeanshipStudentServices = createAsyncThunk(
  "deanship/fetchDeanshipStudentServices",
  async (deanshipType?: string): Promise<DeanshipStudentService[]> => {
    const url = deanshipType
      ? `deanship-student-service?deanshipType=${deanshipType}`
      : "deanship-student-service";
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
export const createDeanshipStudentService = createAsyncThunk(
  "deanship/createDeanshipStudentService",
  async (
    council: Partial<DeanshipStudentService>
  ): Promise<DeanshipStudentService> => {
    try {
      const response = await httpClient("deanship-student-service", {
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
export const updateDeanshipStudentService = createAsyncThunk(
  "deanship/updateDeanshipStudentService",
  async ({
    id,
    change,
  }: UpdateDeanshipStudentService): Promise<DeanshipStudentService> => {
    try {
      const response = await httpClient(`deanship-student-service/${id}`, {
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
export const deleteDeanshipStudentService = createAsyncThunk(
  "deanship/deleteDeanshipStudentService",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`deanship-student-service/${id}`, { method: "DELETE" });
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
export const sortDeanshipStudentService = createAsyncThunk(
  "deanship/sortDeanshipStudentService",
  async (sort: any): Promise<string> => {
    try {
      const res = await httpClient(`deanship-student-service/sort`, {
        method: "POST",
        body: { sort },
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
