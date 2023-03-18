import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "./model";
import {
  createContact,
  deleteContact,
  fetchContact,
  updateContact,
} from "./thunk";

const initialState = {
  loading: false,
  contact: [] as Contact[],
  error: null as null | string,
  currentContactId: null as null | string,
  currentContactSite: null as null | Contact,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setCurrentContact: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentContactId = payload || null;
      state.currentContactSite =
        state.contact.find(({ id }) => id === payload) || null;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all
     * -------------------------------------------------
     */
    builder.addCase(fetchContact.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchContact.fulfilled,
      (state, { payload }: PayloadAction<Contact[]>) => {
        state.loading = false;
        state.contact = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchContact.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create
     * -------------------------------------------------
     */
    builder.addCase(createContact.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createContact.fulfilled,
      (state, { payload }: PayloadAction<Contact>) => {
        state.loading = false;
        state.contact = [...state.contact, payload];
        state.error = null;
      }
    );

    builder.addCase(createContact.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update
     * -------------------------------------------------
     */
    builder.addCase(updateContact.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateContact.fulfilled,
      (state, { payload }: PayloadAction<Contact>) => {
        state.loading = false;
        state.contact = state.contact.map((vision) => {
          if (vision.id === payload.id) return payload;
          return vision;
        });
        state.error = null;
      }
    );

    builder.addCase(updateContact.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete
     * -------------------------------------------------
     */
    builder.addCase(deleteContact.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteContact.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.contact = state.contact.filter(({ id }) => id !== payload);
        state.error = null;
      }
    );

    builder.addCase(deleteContact.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentContact } = contactSlice.actions;

export const contactReducer = contactSlice.reducer;
