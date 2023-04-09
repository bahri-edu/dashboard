import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeanshipDepartment, UpdateDeanshipDepartment } from "./model";
import { DeanshipTypeEnum } from "..";

/**
 * -------------------------------------------------------
 *  fetch all
 * -------------------------------------------------------
 */
export const fetchDeanshipDepartments = createAsyncThunk(
  "deanship/fetchDeanshipDepartments",
  async (deanshipType?: string): Promise<DeanshipDepartment[]> => {
    const url = deanshipType
      ? `deanship-department?deanshipType=${deanshipType}`
      : "deanship-department";
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
export const createDeanshipDepartment = createAsyncThunk(
  "deanship/createDeanshipDepartment",
  async (council: Partial<DeanshipDepartment>): Promise<DeanshipDepartment> => {
    try {
      const response = await httpClient("deanship-department", {
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
export const updateDeanshipDepartment = createAsyncThunk(
  "deanship/updateDeanshipDepartment",
  async ({
    id,
    change,
  }: UpdateDeanshipDepartment): Promise<DeanshipDepartment> => {
    try {
      const response = await httpClient(`deanship-department/${id}`, {
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
export const deleteDeanshipDepartment = createAsyncThunk(
  "deanship/deleteDeanshipDepartment",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`deanship-department/${id}`, { method: "DELETE" });
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
export const sortDeanshipDepartment = createAsyncThunk(
  "deanship/sortDeanshipStudentService",
  async (sort: any): Promise<string> => {
    try {
      const res = await httpClient(`deanship-department/sort`, {
        method: "POST",
        body: { sort },
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
