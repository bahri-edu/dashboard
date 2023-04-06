import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Council } from "./model";
import {
  createCouncil,
  deleteCouncil,
  fetchCouncils,
  updateCouncil,
} from "./thunk";

const initialState = {
  loading: false,
  councils: [] as Council[],
  error: null as null | string,
  currentCouncilId: null as null | string,
  currentCouncil: null as null | Council,
};

const councilSlice = createSlice({
  name: "council",
  initialState,
  reducers: {
    setCurrentCouncil: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentCouncilId = payload || null;
      state.currentCouncil =
        state.councils.find(({ id }) => id === payload) || null;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all
     * -------------------------------------------------
     */
    builder.addCase(fetchCouncils.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchCouncils.fulfilled,
      (state, { payload }: PayloadAction<Council[]>) => {
        state.loading = false;
        state.councils = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchCouncils.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createCouncil.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createCouncil.fulfilled,
      (state, { payload }: PayloadAction<Council>) => {
        state.loading = false;
        state.councils = [...state.councils, payload];
        state.error = null;
      }
    );

    builder.addCase(createCouncil.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateCouncil.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateCouncil.fulfilled,
      (state, { payload }: PayloadAction<Council>) => {
        state.loading = false;
        state.councils = state.councils.map((vision) => {
          if (vision.id === payload.id) return payload;
          return vision;
        });
        state.error = null;
      }
    );

    builder.addCase(updateCouncil.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteCouncil.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteCouncil.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.councils = state.councils.filter(({ id }) => id !== payload);
        state.error = null;
      }
    );

    builder.addCase(deleteCouncil.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentCouncil } = councilSlice.actions;

export const councilReducer = councilSlice.reducer;
