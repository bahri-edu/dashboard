import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeanshipAdministration } from "./model";
import {
  createDeanshipAdministration,
  deleteDeanshipAdministration,
  fetchDeanshipAdministrations,
  sortDeanshipAdministration,
  updateDeanshipAdministration,
} from "./thunk";

const initialState = {
  loading: false,
  deanshipAdministrations: [] as DeanshipAdministration[],
  error: null as null | string,
  currentDeanshipAdministrationId: null as null | string,
  currentDeanshipAdministration: null as null | DeanshipAdministration,
};

const deanshipAdministrationSlice = createSlice({
  name: "deanshipAdministration",
  initialState,
  reducers: {
    setCurrentDeanshipAdministration: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentDeanshipAdministrationId = payload || null;
      state.currentDeanshipAdministration =
        state.deanshipAdministrations.find(({ id }) => id === payload) || null;
    },

    sortDeanshipAdministrations: (
      state,
      { payload }: PayloadAction<DeanshipAdministration[]>
    ) => {
      state.deanshipAdministrations = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all
     * -------------------------------------------------
     */
    builder.addCase(fetchDeanshipAdministrations.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchDeanshipAdministrations.fulfilled,
      (state, { payload }: PayloadAction<DeanshipAdministration[]>) => {
        state.loading = false;
        state.deanshipAdministrations = payload;
        state.error = null;
      }
    );

    builder.addCase(
      fetchDeanshipAdministrations.rejected,
      (state, { error }) => {
        state.loading = false;
        state.error = error.message || "Error";
      }
    );

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createDeanshipAdministration.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createDeanshipAdministration.fulfilled,
      (state, { payload }: PayloadAction<DeanshipAdministration>) => {
        state.loading = false;
        state.deanshipAdministrations = [
          ...state.deanshipAdministrations,
          payload,
        ];
        state.error = null;
      }
    );

    builder.addCase(
      createDeanshipAdministration.rejected,
      (state, { error }) => {
        state.loading = false;
        state.error = error.message || "Error";
      }
    );

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateDeanshipAdministration.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateDeanshipAdministration.fulfilled,
      (state, { payload }: PayloadAction<DeanshipAdministration>) => {
        state.loading = false;
        state.deanshipAdministrations = state.deanshipAdministrations.map(
          (vision) => {
            if (vision.id === payload.id) return payload;
            return vision;
          }
        );
        state.error = null;
      }
    );

    builder.addCase(
      updateDeanshipAdministration.rejected,
      (state, { error }) => {
        state.loading = false;
        state.error = error.message || "Error";
      }
    );

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteDeanshipAdministration.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteDeanshipAdministration.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.deanshipAdministrations = state.deanshipAdministrations.filter(
          ({ id }) => id !== payload
        );
        state.error = null;
      }
    );

    builder.addCase(
      deleteDeanshipAdministration.rejected,
      (state, { error }) => {
        state.loading = false;
        state.error = error.message || "Error";
      }
    );

    /**
     * -------------------------------------------------
     * soert
     * -------------------------------------------------
     */
    builder.addCase(sortDeanshipAdministration.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sortDeanshipAdministration.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(sortDeanshipAdministration.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentDeanshipAdministration, sortDeanshipAdministrations } =
  deanshipAdministrationSlice.actions;

export const deanshipAdministrationReducer =
  deanshipAdministrationSlice.reducer;
