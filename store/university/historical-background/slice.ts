import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoricalBackground } from "./model";
import {
  createHistoricalBackground,
  deleteHistoricalBackground,
  fetchHistoricalBackground,
  updateHistoricalBackground,
} from "./thunk";

const initialState = {
  loading: false,
  historicalBackground: [] as HistoricalBackground[],
  error: null as null | string,
  currentHistoricalBackgroundId: null as null | string,
  currentHistoricalBackground: null as null | HistoricalBackground,
};

const historicalBackgroundSlice = createSlice({
  name: "visionMission",
  initialState,
  reducers: {
    setCurrentHistoricalBackground: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentHistoricalBackgroundId = payload || null;
      state.currentHistoricalBackground =
        state.historicalBackground.find(({ id }) => id === payload) || null;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all news
     * -------------------------------------------------
     */
    builder.addCase(fetchHistoricalBackground.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchHistoricalBackground.fulfilled,
      (state, { payload }: PayloadAction<HistoricalBackground[]>) => {
        state.loading = false;
        state.historicalBackground = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchHistoricalBackground.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createHistoricalBackground.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createHistoricalBackground.fulfilled,
      (state, { payload }: PayloadAction<HistoricalBackground>) => {
        state.loading = false;
        state.historicalBackground = [...state.historicalBackground, payload];
        state.error = null;
      }
    );

    builder.addCase(createHistoricalBackground.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateHistoricalBackground.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateHistoricalBackground.fulfilled,
      (state, { payload }: PayloadAction<HistoricalBackground>) => {
        state.loading = false;
        state.historicalBackground = state.historicalBackground.map((hi) => {
          if (hi.id === payload.id) return payload;
          return hi;
        });
        state.error = null;
      }
    );

    builder.addCase(updateHistoricalBackground.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteHistoricalBackground.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteHistoricalBackground.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.historicalBackground = state.historicalBackground.filter(
          ({ id }) => id !== payload
        );
        state.error = null;
      }
    );

    builder.addCase(deleteHistoricalBackground.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentHistoricalBackground } =
  historicalBackgroundSlice.actions;

export const historicalBackgroundReducer = historicalBackgroundSlice.reducer;
