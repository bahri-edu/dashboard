import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateLogo, Logo } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all news
 * -------------------------------------------------------
 */
export const fetchLogo = createAsyncThunk(
  "logo/fetchLogo",
  async (): Promise<Logo[]> => {
    try {
      const response = await httpClient("logo");

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
export const createLogo = createAsyncThunk(
  "logo/createLogo",
  async (logo: Partial<Logo>): Promise<Logo> => {
    try {
      const response = await httpClient("logo", {
        method: "POST",
        body: logo,
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
export const updateLogo = createAsyncThunk(
  "logo/updateLogo",
  async ({ id, change }: UpdateLogo): Promise<Logo> => {
    try {
      const response = await httpClient(`logo/${id}`, {
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
export const deleteLogo = createAsyncThunk(
  "logo/deleteLogo",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`logo/${id}`, { method: "DELETE" });
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
export const sortLogo = createAsyncThunk(
  "logo/sortLogo",
  async (sort: any): Promise<string> => {
    try {
      const res = await httpClient(`logo/sort`, {
        method: "POST",
        body: { sort },
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
