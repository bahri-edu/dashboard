import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Deanship, UpdateDeanship } from "./model";
import { DeanshipTypeEnum } from "..";

/**
 * -------------------------------------------------------
 *  fetch all
 * -------------------------------------------------------
 */
export const fetchDeanships = createAsyncThunk(
  "deanship/fetchDeanships",
  async (deanshipType?: string): Promise<Deanship[]> => {
    const url = deanshipType
      ? `deanship?deanshipType=${deanshipType}`
      : "deanship";
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
export const createDeanship = createAsyncThunk(
  "deanship/createDeanship",
  async (council: Partial<Deanship>): Promise<Deanship> => {
    try {
      const response = await httpClient("deanship", {
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
export const updateDeanship = createAsyncThunk(
  "deanship/updateDeanship",
  async ({ id, change }: UpdateDeanship): Promise<Deanship> => {
    try {
      const response = await httpClient(`deanship/${id}`, {
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
export const deleteDeanship = createAsyncThunk(
  "deanship/deleteDeanship",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`deanship/${id}`, { method: "DELETE" });
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
export const sortDeanship = createAsyncThunk(
  "deanship/sortDeanship",
  async (sort: any): Promise<string> => {
    try {
      const res = await httpClient(`deanship/sort`, {
        method: "POST",
        body: { sort },
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
