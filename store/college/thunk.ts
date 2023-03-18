import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { College, UpdateCollege } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all Colleges
 * -------------------------------------------------------
 */
export const fetchColleges = createAsyncThunk(
  "college/fetchColleges",
  async (): Promise<College[]> => {
    try {
      const response = await httpClient("colleges");

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
/**
 * -------------------------------------------------------
 *  create  College
 * -------------------------------------------------------
 */
export const createCollege = createAsyncThunk(
  "college/createCollege",
  async (college: Partial<College>): Promise<College> => {
    try {
      const response = await httpClient("colleges", {
        method: "POST",
        body: college,
      });

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

/**
 * -------------------------------------------------------
 *  update  College
 * -------------------------------------------------------
 */
export const updateCollege = createAsyncThunk(
  "college/updateCollege",
  async ({ id, college }: UpdateCollege): Promise<College> => {
    try {
      const response = await httpClient(`colleges/${id}`, {
        method: "PUT",
        body: college,
      });

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

/**
 * -------------------------------------------------------
 *  delete  College
 * -------------------------------------------------------
 */
export const deleteCollege = createAsyncThunk(
  "college/deleteCollege",
  async (id: string): Promise<string> => {
    try {
      const response = await httpClient(`colleges/${id}`, {
        method: "DELETE",
      });

      return id;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
