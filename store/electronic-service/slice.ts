import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EService } from "./model";
import {
  createEService,
  deleteEService,
  fetchEServices,
  sortEServices,
  updateEService,
} from "./thunk";

const initialState = {
  loading: false,
  eServices: [] as EService[],
  error: null as null | string,
  currentEServiceId: null as null | string,
  currentEService: null as null | EService,
};

const eServiceSlice = createSlice({
  name: "eService",
  initialState,
  reducers: {
    setCurrentEService: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentEServiceId = payload || null;
      state.currentEService =
        state.eServices.find(({ id }) => id === payload) || null;
    },

    sortEService: (state, { payload }: PayloadAction<EService[]>) => {
      state.eServices = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all news
     * -------------------------------------------------
     */
    builder.addCase(fetchEServices.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchEServices.fulfilled,
      (state, { payload }: PayloadAction<EService[]>) => {
        state.loading = false;
        state.eServices = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchEServices.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createEService.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createEService.fulfilled,
      (state, { payload }: PayloadAction<EService>) => {
        state.loading = false;
        state.eServices = [...state.eServices, payload];
        state.error = null;
      }
    );

    builder.addCase(createEService.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateEService.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateEService.fulfilled,
      (state, { payload }: PayloadAction<EService>) => {
        state.loading = false;
        state.eServices = state.eServices.map((srv) => {
          if (srv.id === payload.id) return payload;
          return srv;
        });
        state.error = null;
      }
    );

    builder.addCase(updateEService.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteEService.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteEService.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.eServices = state.eServices.filter(({ id }) => id !== payload);
        state.error = null;
      }
    );

    builder.addCase(deleteEService.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * soert Vision Mission
     * -------------------------------------------------
     */
    builder.addCase(sortEServices.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sortEServices.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(sortEServices.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentEService, sortEService } = eServiceSlice.actions;

export const eServiceReducer = eServiceSlice.reducer;
