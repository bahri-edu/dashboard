import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Staff } from "./model";
import { createStaff, deleteStaff, fetchStaffs, updateStaff } from "./thunk";

const initialState = {
  loading: false,
  staffs: [] as Staff[],
  error: null as null | string,
  currentStaffId: null as null | string,
  currentStaff: null as null | Staff,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setCurrentStaff: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentStaffId = payload || null;
      state.currentStaff =
        state.staffs.find(({ id }) => id === payload) || null;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all
     * -------------------------------------------------
     */
    builder.addCase(fetchStaffs.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchStaffs.fulfilled,
      (state, { payload }: PayloadAction<Staff[]>) => {
        state.loading = false;
        state.staffs = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchStaffs.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createStaff.fulfilled,
      (state, { payload }: PayloadAction<Staff>) => {
        state.loading = false;
        state.staffs = [...state.staffs, payload];
        state.error = null;
      }
    );

    builder.addCase(createStaff.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateStaff.fulfilled,
      (state, { payload }: PayloadAction<Staff>) => {
        state.loading = false;
        state.staffs = state.staffs.map((vision) => {
          if (vision.id === payload.id) return payload;
          return vision;
        });
        state.error = null;
      }
    );

    builder.addCase(updateStaff.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteStaff.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.staffs = state.staffs.filter(({ id }) => id !== payload);
        state.error = null;
      }
    );

    builder.addCase(deleteStaff.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentStaff } = staffSlice.actions;

export const staffReducer = staffSlice.reducer;
