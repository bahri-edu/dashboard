import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Logo } from "./model";
import {
  createLogo,
  deleteLogo,
  fetchLogo,
  sortLogo,
  updateLogo,
} from "./thunk";

const initialState = {
  loading: false,
  logos: [] as Logo[],
  error: null as null | string,
  currentLogoId: null as null | string,
  currentLogo: null as null | Logo,
};

const logoSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {
    setCurrentLogo: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentLogoId = payload || null;
      state.currentLogo = state.logos.find(({ id }) => id === payload) || null;
    },

    sortLogos: (state, { payload }: PayloadAction<Logo[]>) => {
      state.logos = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all news
     * -------------------------------------------------
     */
    builder.addCase(fetchLogo.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchLogo.fulfilled,
      (state, { payload }: PayloadAction<Logo[]>) => {
        state.loading = false;
        state.logos = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchLogo.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createLogo.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createLogo.fulfilled,
      (state, { payload }: PayloadAction<Logo>) => {
        state.loading = false;
        state.logos = [...state.logos, payload];
        state.error = null;
      }
    );

    builder.addCase(createLogo.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateLogo.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateLogo.fulfilled,
      (state, { payload }: PayloadAction<Logo>) => {
        state.loading = false;
        state.logos = state.logos.map((logo) => {
          if (logo.id === payload.id) return payload;
          return logo;
        });
        state.error = null;
      }
    );

    builder.addCase(updateLogo.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteLogo.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteLogo.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.logos = state.logos.filter(({ id }) => id !== payload);
        state.error = null;
      }
    );

    builder.addCase(deleteLogo.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * soert Vision Mission
     * -------------------------------------------------
     */
    builder.addCase(sortLogo.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sortLogo.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(sortLogo.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentLogo, sortLogos } = logoSlice.actions;

export const logoReducer = logoSlice.reducer;
