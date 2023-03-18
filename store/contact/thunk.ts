import { httpClient } from "@/utils/http.util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Contact, UpdateContact } from "./model";

/**
 * -------------------------------------------------------
 *  fetch
 * -------------------------------------------------------
 */
export const fetchContact = createAsyncThunk(
  "contact/fetchContact",
  async (): Promise<Contact[]> => {
    try {
      const response = await httpClient("contact");

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
export const createContact = createAsyncThunk(
  "contact/createContact",
  async (contact: Partial<Contact>): Promise<Contact> => {
    try {
      const response = await httpClient("contact", {
        method: "POST",
        body: contact,
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
export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async ({ id, change }: UpdateContact): Promise<Contact> => {
    try {
      const response = await httpClient(`contact/${id}`, {
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
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id: string): Promise<string> => {
    try {
      await httpClient(`contact/${id}`, { method: "DELETE" });
      return id;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
