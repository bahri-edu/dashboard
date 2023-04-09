import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeanshipDepartment } from "./model";
import {
  createDeanshipDepartment,
  deleteDeanshipDepartment,
  fetchDeanshipDepartments,
  sortDeanshipDepartment,
  updateDeanshipDepartment,
} from "./thunk";
import { updateDeanshipAdministration } from "../administration";

const initialState = {
  loading: false,
  deanshipDepartments: [] as DeanshipDepartment[],
  error: null as null | string,
  currentDeanshipDepartmentId: null as null | string,
  currentDeanshipDepartment: null as null | DeanshipDepartment,
};

const deanshipDepartmentSlice = createSlice({
  name: "deanshipDepartment",
  initialState,
  reducers: {
    setCurrentDeanshipDepartment: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentDeanshipDepartmentId = payload || null;
      state.currentDeanshipDepartment =
        state.deanshipDepartments.find(({ id }) => id === payload) || null;
    },

    sortDeanshipDepartments: (
      state,
      { payload }: PayloadAction<DeanshipDepartment[]>
    ) => {
      state.deanshipDepartments = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all
     * -------------------------------------------------
     */
    builder.addCase(fetchDeanshipDepartments.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchDeanshipDepartments.fulfilled,
      (state, { payload }: PayloadAction<DeanshipDepartment[]>) => {
        state.loading = false;
        state.deanshipDepartments = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchDeanshipDepartments.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createDeanshipDepartment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createDeanshipDepartment.fulfilled,
      (state, { payload }: PayloadAction<DeanshipDepartment>) => {
        state.loading = false;
        state.deanshipDepartments = [...state.deanshipDepartments, payload];
        state.error = null;
      }
    );

    builder.addCase(createDeanshipDepartment.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateDeanshipDepartment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateDeanshipDepartment.fulfilled,
      (state, { payload }: PayloadAction<DeanshipDepartment>) => {
        state.loading = false;
        state.deanshipDepartments = state.deanshipDepartments.map((vision) => {
          if (vision.id === payload.id) return payload;
          return vision;
        });
        state.error = null;
      }
    );

    builder.addCase(updateDeanshipDepartment.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteDeanshipDepartment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteDeanshipDepartment.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.deanshipDepartments = state.deanshipDepartments.filter(
          ({ id }) => id !== payload
        );
        state.error = null;
      }
    );

    builder.addCase(deleteDeanshipDepartment.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * soert
     * -------------------------------------------------
     */
    builder.addCase(sortDeanshipDepartment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sortDeanshipDepartment.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(sortDeanshipDepartment.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentDeanshipDepartment, sortDeanshipDepartments } =
  deanshipDepartmentSlice.actions;

export const deanshipDepartmentReducer = deanshipDepartmentSlice.reducer;
