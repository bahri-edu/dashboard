import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ViceChancellorMessage, UpdateViceChancellorMessage } from "./model";

/**
 * -------------------------------------------------------
 *  fetch all news
 * -------------------------------------------------------
 */
export const fetchMessages = createAsyncThunk(
  "vice-chancellor/fetchMessages",
  async (): Promise<ViceChancellorMessage[]> => {
    try {
      const response = await httpClient("vice-chancellor/message");

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
export const createMessage = createAsyncThunk(
  "vice-chancellor/createMessage",
  async (
    message: Partial<ViceChancellorMessage>
  ): Promise<ViceChancellorMessage> => {
    try {
      const response = await httpClient("vice-chancellor/message", {
        method: "POST",
        body: message,
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
export const updateMessage = createAsyncThunk(
  "vice-chancellor/updateMessage",
  async ({
    id,
    change,
  }: UpdateViceChancellorMessage): Promise<ViceChancellorMessage> => {
    try {
      const response = await httpClient(`vice-chancellor/message/${id}`, {
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
export const deleteMessage = createAsyncThunk(
  "vice-chancellor/deleteMessage",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`vice-chancellor/message/${id}`, { method: "DELETE" });
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
// export const sortLogo = createAsyncThunk(
//   "vice-chancellor/sortLogo",
//   async (sort: any): Promise<string> => {
//     try {
//       const res = await httpClient(`logo/sort`, {
//         method: "POST",
//         body: { sort },
//       });
//       return res;
//     } catch (error: any) {
//       throw new Error(error);
//     }
//   }
// );
