import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Staff, UpdateStaff } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all
 * -------------------------------------------------------
 */
export const fetchStaffs = createAsyncThunk(
  "staff/fetchStaffs",
  async (collegeId?: string): Promise<Staff[]> => {
    const url = collegeId ? `staff?collegeId=${collegeId}` : "staff";
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
export const createStaff = createAsyncThunk(
  "staff/createStaff",
  async (council: Partial<Staff>): Promise<Staff> => {
    try {
      const response = await httpClient("staff", {
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
export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async ({ id, change }: UpdateStaff): Promise<Staff> => {
    try {
      const response = await httpClient(`staff/${id}`, {
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
export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`staff/${id}`, { method: "DELETE" });
      return id;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
