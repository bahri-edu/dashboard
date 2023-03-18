import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { College } from "./model";
import {
  createCollege,
  deleteCollege,
  fetchColleges,
  updateCollege,
} from "./thunk";

const initialState = {
  loading: false,
  colleges: [] as College[],
  error: null as null | string,
  currentCollegeId: null as null | string,
  currentCollege: null as null | College,
};

const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {
    setCurrentCollege: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentCollegeId = payload || null;
      state.currentCollege =
        state.colleges.find(({ id }) => id === payload) || null;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all colleges
     * -------------------------------------------------
     */
    builder.addCase(fetchColleges.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchColleges.fulfilled,
      (state, { payload }: PayloadAction<College[]>) => {
        state.loading = false;
        state.colleges = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchColleges.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create college
     * -------------------------------------------------
     */
    builder.addCase(createCollege.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createCollege.fulfilled,
      (state, { payload }: PayloadAction<College>) => {
        state.loading = false;
        state.colleges = [...state.colleges, payload];
        state.error = null;
      }
    );

    builder.addCase(createCollege.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update college
     * -------------------------------------------------
     */
    builder.addCase(updateCollege.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateCollege.fulfilled,
      (state, { payload }: PayloadAction<College>) => {
        state.loading = false;
        state.colleges = state.colleges.map((college) => {
          if (college.id === payload.id) return payload;
          return college;
        });
        state.error = null;
      }
    );

    builder.addCase(updateCollege.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete college
     * -------------------------------------------------
     */
    builder.addCase(deleteCollege.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteCollege.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.colleges = state.colleges.filter(
          (college) => college.id !== payload
        );
        state.error = null;
      }
    );

    builder.addCase(deleteCollege.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentCollege } = collegeSlice.actions;

export const collegeReducer = collegeSlice.reducer;
