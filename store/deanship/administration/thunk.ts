import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeanshipAdministration, UpdateDeanshipAdministration } from "./model";
import { DeanshipTypeEnum } from "..";

/**
 * -------------------------------------------------------
 *  fetch all
 * -------------------------------------------------------
 */
export const fetchDeanshipAdministrations = createAsyncThunk(
  "deanship/fetchDeanshipAdministrations",
  async (deanshipType?: string): Promise<DeanshipAdministration[]> => {
    const url = deanshipType
      ? `deanship-administration?deanshipType=${deanshipType}`
      : "deanship-administration";
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
export const createDeanshipAdministration = createAsyncThunk(
  "deanship/createDeanshipAdministration",
  async (
    council: Partial<DeanshipAdministration>
  ): Promise<DeanshipAdministration> => {
    try {
      const response = await httpClient("deanship-administration", {
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
export const updateDeanshipAdministration = createAsyncThunk(
  "deanship/updateDeanshipAdministration",
  async ({
    id,
    change,
  }: UpdateDeanshipAdministration): Promise<DeanshipAdministration> => {
    try {
      const response = await httpClient(`deanship-administration/${id}`, {
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
export const deleteDeanshipAdministration = createAsyncThunk(
  "deanship/deleteDeanshipAdministration",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`deanship-administration/${id}`, { method: "DELETE" });
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
export const sortDeanshipAdministration = createAsyncThunk(
  "deanship/sortDeanshipAdministration",
  async (sort: any): Promise<string> => {
    try {
      const res = await httpClient(`deanship-administration/sort`, {
        method: "POST",
        body: { sort },
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
