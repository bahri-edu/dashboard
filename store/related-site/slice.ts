import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RelatedSite } from "./model";
import {
  createRelatedSite,
  deleteRelatedSite,
  fetchRelatedSite,
  sortRelatedSite,
  updateRelatedSite,
} from "./thunk";

const initialState = {
  loading: false,
  relatedSite: [] as RelatedSite[],
  error: null as null | string,
  currentRelatedSiteId: null as null | string,
  currentRelatedSite: null as null | RelatedSite,
};

const relatedSiteSlice = createSlice({
  name: "relatedSite",
  initialState,
  reducers: {
    setCurrentRelatedSite: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentRelatedSiteId = payload || null;
      state.currentRelatedSite =
        state.relatedSite.find(({ id }) => id === payload) || null;
    },

    sortRelatedSiteTemp: (state, { payload }: PayloadAction<RelatedSite[]>) => {
      state.relatedSite = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all
     * -------------------------------------------------
     */
    builder.addCase(fetchRelatedSite.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchRelatedSite.fulfilled,
      (state, { payload }: PayloadAction<RelatedSite[]>) => {
        state.loading = false;
        state.relatedSite = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchRelatedSite.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create
     * -------------------------------------------------
     */
    builder.addCase(createRelatedSite.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createRelatedSite.fulfilled,
      (state, { payload }: PayloadAction<RelatedSite>) => {
        state.loading = false;
        state.relatedSite = [...state.relatedSite, payload];
        state.error = null;
      }
    );

    builder.addCase(createRelatedSite.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update
     * -------------------------------------------------
     */
    builder.addCase(updateRelatedSite.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateRelatedSite.fulfilled,
      (state, { payload }: PayloadAction<RelatedSite>) => {
        state.loading = false;
        state.relatedSite = state.relatedSite.map((vision) => {
          if (vision.id === payload.id) return payload;
          return vision;
        });
        state.error = null;
      }
    );

    builder.addCase(updateRelatedSite.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete
     * -------------------------------------------------
     */
    builder.addCase(deleteRelatedSite.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteRelatedSite.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.relatedSite = state.relatedSite.filter(
          ({ id }) => id !== payload
        );
        state.error = null;
      }
    );

    builder.addCase(deleteRelatedSite.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * soert
     * -------------------------------------------------
     */
    builder.addCase(sortRelatedSite.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sortRelatedSite.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(sortRelatedSite.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentRelatedSite, sortRelatedSiteTemp } =
  relatedSiteSlice.actions;

export const relatedSiteReducer = relatedSiteSlice.reducer;
