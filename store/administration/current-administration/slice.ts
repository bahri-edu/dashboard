import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentAdministration } from "./model";
import {
  createCurrentAdministration,
  deleteCurrentAdministration,
  fetchCurrentAdministrations,
  updateCurrentAdministration,
} from "./thunk";

const initialState = {
  loading: false,
  currentAdministrations: [] as CurrentAdministration[],
  error: null as null | string,
  currentAdministrationId: null as null | string,
  currentAdministration: null as null | CurrentAdministration,
};

const currentAdministrationSlice = createSlice({
  name: "currentAdministrationSlice",
  initialState,
  reducers: {
    setCurrentAdministration: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentAdministrationId = payload || null;
      state.currentAdministration =
        state.currentAdministrations.find(({ id }) => id === payload) || null;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all news
     * -------------------------------------------------
     */
    builder.addCase(fetchCurrentAdministrations.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchCurrentAdministrations.fulfilled,
      (state, { payload }: PayloadAction<CurrentAdministration[]>) => {
        state.loading = false;
        state.currentAdministrations = payload;
        state.error = null;
      }
    );

    builder.addCase(
      fetchCurrentAdministrations.rejected,
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
    builder.addCase(createCurrentAdministration.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createCurrentAdministration.fulfilled,
      (state, { payload }: PayloadAction<CurrentAdministration>) => {
        state.loading = false;
        state.currentAdministrations = [
          ...state.currentAdministrations,
          payload,
        ];
        state.error = null;
      }
    );

    builder.addCase(
      createCurrentAdministration.rejected,
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
    builder.addCase(updateCurrentAdministration.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateCurrentAdministration.fulfilled,
      (state, { payload }: PayloadAction<CurrentAdministration>) => {
        state.loading = false;
        state.currentAdministrations = state.currentAdministrations.map(
          (current) => {
            if (current.id === payload.id) return payload;
            return current;
          }
        );
        state.error = null;
      }
    );

    builder.addCase(
      updateCurrentAdministration.rejected,
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
    builder.addCase(deleteCurrentAdministration.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteCurrentAdministration.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.currentAdministrations = state.currentAdministrations.filter(
          ({ id }) => id !== payload
        );
        state.error = null;
      }
    );

    builder.addCase(
      deleteCurrentAdministration.rejected,
      (state, { error }) => {
        state.loading = false;
        state.error = error.message || "Error";
      }
    );

    // /**
    //  * -------------------------------------------------
    //  * soert Vision Mission
    //  * -------------------------------------------------
    //  */
    // builder.addCase(sortLogo.pending, (state) => {
    //   state.loading = true;
    // });

    // builder.addCase(sortLogo.fulfilled, (state) => {
    //   state.loading = false;
    //   state.error = null;
    // });

    // builder.addCase(sortLogo.rejected, (state, { error }) => {
    //   state.loading = false;
    //   state.error = error.message || "Error";
    // });
  },
});

export const { setCurrentAdministration } = currentAdministrationSlice.actions;

export const currentAdministrationReducer = currentAdministrationSlice.reducer;
