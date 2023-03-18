import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RelatedSite, UpdateRelatedSite } from "./model";

/**
 * -------------------------------------------------------
 *  fetch
 * -------------------------------------------------------
 */
export const fetchRelatedSite = createAsyncThunk(
  "relatedSite/fetchRelatedSite",
  async (): Promise<RelatedSite[]> => {
    try {
      const response = await httpClient("related-site");

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
export const createRelatedSite = createAsyncThunk(
  "relatedSite/createRelatedSite",
  async (change: Partial<RelatedSite>): Promise<RelatedSite> => {
    try {
      const response = await httpClient("related-site", {
        method: "POST",
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
 *  update
 * -------------------------------------------------------
 */
export const updateRelatedSite = createAsyncThunk(
  "relatedSite/updateRelatedSite",
  async ({ id, change }: UpdateRelatedSite): Promise<RelatedSite> => {
    try {
      const response = await httpClient(`related-site/${id}`, {
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
export const deleteRelatedSite = createAsyncThunk(
  "relatedSite/deleteRelatedSite",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`related-site/${id}`, { method: "DELETE" });
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
export const sortRelatedSite = createAsyncThunk(
  "relatedSite/sortRelatedSite",
  async (sort: any): Promise<string> => {
    try {
      const res = await httpClient(`related-site/sort`, {
        method: "POST",
        body: { sort },
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
