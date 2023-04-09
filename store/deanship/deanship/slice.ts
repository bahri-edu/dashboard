import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deanship } from "./model";
import {
  createDeanship,
  deleteDeanship,
  fetchDeanships,
  sortDeanship,
  updateDeanship,
} from "./thunk";

const initialState = {
  loading: false,
  deanships: [] as Deanship[],
  error: null as null | string,
  currentDeanshipId: null as null | string,
  currentDeanship: null as null | Deanship,
};

const deanshipSlice = createSlice({
  name: "deanship",
  initialState,
  reducers: {
    setCurrentDeanship: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentDeanshipId = payload || null;
      state.currentDeanship =
        state.deanships.find(({ id }) => id === payload) || null;
    },

    sortDeanships: (state, { payload }: PayloadAction<Deanship[]>) => {
      state.deanships = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all
     * -------------------------------------------------
     */
    builder.addCase(fetchDeanships.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchDeanships.fulfilled,
      (state, { payload }: PayloadAction<Deanship[]>) => {
        state.loading = false;
        state.deanships = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchDeanships.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createDeanship.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createDeanship.fulfilled,
      (state, { payload }: PayloadAction<Deanship>) => {
        state.loading = false;
        state.deanships = [...state.deanships, payload];
        state.error = null;
      }
    );

    builder.addCase(createDeanship.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateDeanship.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateDeanship.fulfilled,
      (state, { payload }: PayloadAction<Deanship>) => {
        state.loading = false;
        state.deanships = state.deanships.map((vision) => {
          if (vision.id === payload.id) return payload;
          return vision;
        });
        state.error = null;
      }
    );

    builder.addCase(updateDeanship.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteDeanship.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteDeanship.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.deanships = state.deanships.filter(({ id }) => id !== payload);
        state.error = null;
      }
    );

    builder.addCase(deleteDeanship.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * soert
     * -------------------------------------------------
     */
    builder.addCase(sortDeanship.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sortDeanship.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(sortDeanship.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentDeanship, sortDeanships } = deanshipSlice.actions;

export const deanshipReducer = deanshipSlice.reducer;
