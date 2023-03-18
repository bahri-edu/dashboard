import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VisionMission } from "./model";
import {
  createVisionMission,
  deleteVisionMission,
  fetchVisionMission,
  sortVisionMission,
  updateVisionMission,
} from "./thunk";

const initialState = {
  loading: false,
  visionMission: [] as VisionMission[],
  error: null as null | string,
  currentVisionMissionId: null as null | string,
  currentVisionMission: null as null | VisionMission,
};

const visionMissionSlice = createSlice({
  name: "visionMission",
  initialState,
  reducers: {
    setCurrentVisionMission: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentVisionMissionId = payload || null;
      state.currentVisionMission =
        state.visionMission.find(({ id }) => id === payload) || null;
    },

    sortItems: (state, { payload }: PayloadAction<VisionMission[]>) => {
      state.visionMission = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all news
     * -------------------------------------------------
     */
    builder.addCase(fetchVisionMission.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchVisionMission.fulfilled,
      (state, { payload }: PayloadAction<VisionMission[]>) => {
        state.loading = false;
        state.visionMission = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchVisionMission.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createVisionMission.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createVisionMission.fulfilled,
      (state, { payload }: PayloadAction<VisionMission>) => {
        state.loading = false;
        state.visionMission = [...state.visionMission, payload];
        state.error = null;
      }
    );

    builder.addCase(createVisionMission.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateVisionMission.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateVisionMission.fulfilled,
      (state, { payload }: PayloadAction<VisionMission>) => {
        state.loading = false;
        state.visionMission = state.visionMission.map((vision) => {
          if (vision.id === payload.id) return payload;
          return vision;
        });
        state.error = null;
      }
    );

    builder.addCase(updateVisionMission.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteVisionMission.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteVisionMission.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.visionMission = state.visionMission.filter(
          ({ id }) => id !== payload
        );
        state.error = null;
      }
    );

    builder.addCase(deleteVisionMission.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * soert Vision Mission
     * -------------------------------------------------
     */
    builder.addCase(sortVisionMission.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sortVisionMission.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(sortVisionMission.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentVisionMission, sortItems } =
  visionMissionSlice.actions;

export const visionMissionReducer = visionMissionSlice.reducer;
