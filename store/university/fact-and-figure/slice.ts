import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FactAndFigure } from "./model";
import {
  createFactAndFigure,
  deleteFactAndFigure,
  fetchFactAndFigure,
  updateFactAndFigure,
} from "./thunk";

const initialState = {
  loading: false,
  factAndFigure: [] as FactAndFigure[],
  error: null as null | string,
  currentFactAndFigureId: null as null | string,
  currentFactAndFigure: null as null | FactAndFigure,
};

const factAndFigureSlice = createSlice({
  name: "factAndFigure",
  initialState,
  reducers: {
    setCurrentFactAndFigure: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentFactAndFigureId = payload || null;
      state.currentFactAndFigure =
        state.factAndFigure.find(({ id }) => id === payload) || null;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all
     * -------------------------------------------------
     */
    builder.addCase(fetchFactAndFigure.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchFactAndFigure.fulfilled,
      (state, { payload }: PayloadAction<FactAndFigure[]>) => {
        state.loading = false;
        state.factAndFigure = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchFactAndFigure.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create
     * -------------------------------------------------
     */
    builder.addCase(createFactAndFigure.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createFactAndFigure.fulfilled,
      (state, { payload }: PayloadAction<FactAndFigure>) => {
        state.loading = false;
        state.factAndFigure = [...state.factAndFigure, payload];
        state.error = null;
      }
    );

    builder.addCase(createFactAndFigure.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update
     * -------------------------------------------------
     */
    builder.addCase(updateFactAndFigure.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateFactAndFigure.fulfilled,
      (state, { payload }: PayloadAction<FactAndFigure>) => {
        state.loading = false;
        state.factAndFigure = state.factAndFigure.map((hi) => {
          if (hi.id === payload.id) return payload;
          return hi;
        });
        state.error = null;
      }
    );

    builder.addCase(updateFactAndFigure.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete
     * -------------------------------------------------
     */
    builder.addCase(deleteFactAndFigure.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteFactAndFigure.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.factAndFigure = state.factAndFigure.filter(
          ({ id }) => id !== payload
        );
        state.error = null;
      }
    );

    builder.addCase(deleteFactAndFigure.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentFactAndFigure } = factAndFigureSlice.actions;

export const factAndFigureReducer = factAndFigureSlice.reducer;
