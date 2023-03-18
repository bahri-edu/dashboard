import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FactAndFigure, UpdateFactAndFigure } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all
 * -------------------------------------------------------
 */
export const fetchFactAndFigure = createAsyncThunk(
  "factAndFigure/fetchFactAndFigure",
  async (): Promise<FactAndFigure[]> => {
    try {
      const response = await httpClient("fact-and-figure");

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
export const createFactAndFigure = createAsyncThunk(
  "factAndFigure/createFactAndFigure",
  async (news: Partial<FactAndFigure>): Promise<FactAndFigure> => {
    try {
      const response = await httpClient("fact-and-figure", {
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
export const updateFactAndFigure = createAsyncThunk(
  "factAndFigure/updateFactAndFigure",
  async ({ id, change }: UpdateFactAndFigure): Promise<FactAndFigure> => {
    try {
      const response = await httpClient(`fact-and-figure/${id}`, {
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
export const deleteFactAndFigure = createAsyncThunk(
  "factAndFigure/deleteFactAndFigure",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`fact-and-figure/${id}`, { method: "DELETE" });
      return id;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
