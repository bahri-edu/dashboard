import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UniversityAdministration } from "./model";
import {
  createUniversityAdministration,
  deleteUniversityAdministration,
  fetchUniversityAdministrations,
  updateUniversityAdministration,
} from "./thunk";

const initialState = {
  loading: false,
  universityAdministrations: [] as UniversityAdministration[],
  error: null as null | string,
  currentUniversityAdministrationId: null as null | string,
  currentUniversityAdministration: null as null | UniversityAdministration,
};

const universityAdministrationSlice = createSlice({
  name: "universityAdministration",
  initialState,
  reducers: {
    setCurrentUniversityAdministration: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentUniversityAdministrationId = payload || null;
      state.currentUniversityAdministration =
        state.universityAdministrations.find(({ id }) => id === payload) ||
        null;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all
     * -------------------------------------------------
     */
    builder.addCase(fetchUniversityAdministrations.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchUniversityAdministrations.fulfilled,
      (state, { payload }: PayloadAction<UniversityAdministration[]>) => {
        state.loading = false;
        state.universityAdministrations = payload;
        state.error = null;
      }
    );

    builder.addCase(
      fetchUniversityAdministrations.rejected,
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
    builder.addCase(createUniversityAdministration.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createUniversityAdministration.fulfilled,
      (state, { payload }: PayloadAction<UniversityAdministration>) => {
        state.loading = false;
        state.universityAdministrations = [
          ...state.universityAdministrations,
          payload,
        ];
        state.error = null;
      }
    );

    builder.addCase(
      createUniversityAdministration.rejected,
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
    builder.addCase(updateUniversityAdministration.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateUniversityAdministration.fulfilled,
      (state, { payload }: PayloadAction<UniversityAdministration>) => {
        state.loading = false;
        state.universityAdministrations = state.universityAdministrations.map(
          (current) => {
            if (current.id === payload.id) return payload;
            return current;
          }
        );
        state.error = null;
      }
    );

    builder.addCase(
      updateUniversityAdministration.rejected,
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
    builder.addCase(deleteUniversityAdministration.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteUniversityAdministration.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.universityAdministrations =
          state.universityAdministrations.filter(({ id }) => id !== payload);
        state.error = null;
      }
    );

    builder.addCase(
      deleteUniversityAdministration.rejected,
      (state, { error }) => {
        state.loading = false;
        state.error = error.message || "Error";
      }
    );
  },
});

export const { setCurrentUniversityAdministration } =
  universityAdministrationSlice.actions;

export const universityAdministrationReducer =
  universityAdministrationSlice.reducer;
