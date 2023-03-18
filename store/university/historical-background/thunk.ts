import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HistoricalBackground, UpdateHistoricalBackground } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all news
 * -------------------------------------------------------
 */
export const fetchHistoricalBackground = createAsyncThunk(
  "historicalBackground/fetchHistoricalBackground",
  async (): Promise<HistoricalBackground[]> => {
    try {
      const response = await httpClient("historical-background");

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
export const createHistoricalBackground = createAsyncThunk(
  "historicalBackground/createHistoricalBackground",
  async (
    news: Partial<HistoricalBackground>
  ): Promise<HistoricalBackground> => {
    try {
      const response = await httpClient("historical-background", {
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
export const updateHistoricalBackground = createAsyncThunk(
  "historicalBackground/updateHistoricalBackground",
  async ({
    id,
    change,
  }: UpdateHistoricalBackground): Promise<HistoricalBackground> => {
    try {
      const response = await httpClient(`historical-background/${id}`, {
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
export const deleteHistoricalBackground = createAsyncThunk(
  "historicalBackground/deleteHistoricalBackground",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`historical-background/${id}`, { method: "DELETE" });
      return id;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
