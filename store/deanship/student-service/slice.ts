import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeanshipStudentService } from "./model";
import {
  createDeanshipStudentService,
  deleteDeanshipStudentService,
  fetchDeanshipStudentServices,
  sortDeanshipStudentService,
  updateDeanshipStudentService,
} from "./thunk";

const initialState = {
  loading: false,
  deanshipStudentServices: [] as DeanshipStudentService[],
  error: null as null | string,
  currentDeanshipStudentServiceId: null as null | string,
  currentDeanshipStudentService: null as null | DeanshipStudentService,
};

const deanshipStudentServiceSlice = createSlice({
  name: "deanshipStudentService",
  initialState,
  reducers: {
    setCurrentDeanshipStudentService: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentDeanshipStudentServiceId = payload || null;
      state.currentDeanshipStudentService =
        state.deanshipStudentServices.find(({ id }) => id === payload) || null;
    },

    sortDeanshipStudentServices: (
      state,
      { payload }: PayloadAction<DeanshipStudentService[]>
    ) => {
      state.deanshipStudentServices = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all
     * -------------------------------------------------
     */
    builder.addCase(fetchDeanshipStudentServices.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchDeanshipStudentServices.fulfilled,
      (state, { payload }: PayloadAction<DeanshipStudentService[]>) => {
        state.loading = false;
        state.deanshipStudentServices = payload;
        state.error = null;
      }
    );

    builder.addCase(
      fetchDeanshipStudentServices.rejected,
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
    builder.addCase(createDeanshipStudentService.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createDeanshipStudentService.fulfilled,
      (state, { payload }: PayloadAction<DeanshipStudentService>) => {
        state.loading = false;
        state.deanshipStudentServices = [
          ...state.deanshipStudentServices,
          payload,
        ];
        state.error = null;
      }
    );

    builder.addCase(
      createDeanshipStudentService.rejected,
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
    builder.addCase(updateDeanshipStudentService.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateDeanshipStudentService.fulfilled,
      (state, { payload }: PayloadAction<DeanshipStudentService>) => {
        state.loading = false;
        state.deanshipStudentServices = state.deanshipStudentServices.map(
          (vision) => {
            if (vision.id === payload.id) return payload;
            return vision;
          }
        );
        state.error = null;
      }
    );

    builder.addCase(
      updateDeanshipStudentService.rejected,
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
    builder.addCase(deleteDeanshipStudentService.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteDeanshipStudentService.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.deanshipStudentServices = state.deanshipStudentServices.filter(
          ({ id }) => id !== payload
        );
        state.error = null;
      }
    );

    builder.addCase(
      deleteDeanshipStudentService.rejected,
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
    builder.addCase(sortDeanshipStudentService.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sortDeanshipStudentService.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(sortDeanshipStudentService.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentDeanshipStudentService, sortDeanshipStudentServices } =
  deanshipStudentServiceSlice.actions;

export const deanshipStudentServiceReducer =
  deanshipStudentServiceSlice.reducer;
