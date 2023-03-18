import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { News, UpdateNews } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all news
 * -------------------------------------------------------
 */
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (): Promise<News[]> => {
    try {
      const response = await httpClient("news");

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
export const createNews = createAsyncThunk(
  "news/createNews",
  async (news: Partial<News>): Promise<News> => {
    try {
      const response = await httpClient("news", {
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
export const updateNews = createAsyncThunk(
  "news/updateNews",
  async ({ id, news }: UpdateNews): Promise<News> => {
    try {
      const response = await httpClient(`news/${id}`, {
        method: "PUT",
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
 *  delete  news
 * -------------------------------------------------------
 */
export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`news/${id}`, { method: "DELETE" });
      return id;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
