import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UploadFile } from "./model";
import {
  createUploadFile,
  deleteUploadFile,
  fetchUploadFiles,
  sortUploadFile,
  updateUploadFile,
} from "./thunk";

const initialState = {
  loading: false,
  uploadFiles: [] as UploadFile[],
  error: null as null | string,
  currentUploadFileId: null as null | string,
  currentUploadFile: null as null | UploadFile,
};

const uploadFileSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {
    setCurrentUploadFile: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentUploadFileId = payload || null;
      state.currentUploadFile =
        state.uploadFiles.find(({ id }) => id === payload) || null;
    },

    sortUploadFiles: (state, { payload }: PayloadAction<UploadFile[]>) => {
      state.uploadFiles = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all news
     * -------------------------------------------------
     */
    builder.addCase(fetchUploadFiles.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchUploadFiles.fulfilled,
      (state, { payload }: PayloadAction<UploadFile[]>) => {
        state.loading = false;
        state.uploadFiles = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchUploadFiles.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createUploadFile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createUploadFile.fulfilled,
      (state, { payload }: PayloadAction<UploadFile>) => {
        state.loading = false;
        state.uploadFiles = [...state.uploadFiles, payload];
        state.error = null;
      }
    );

    builder.addCase(createUploadFile.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateUploadFile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateUploadFile.fulfilled,
      (state, { payload }: PayloadAction<UploadFile>) => {
        state.loading = false;
        state.uploadFiles = state.uploadFiles.map((logo) => {
          if (logo.id === payload.id) return payload;
          return logo;
        });
        state.error = null;
      }
    );

    builder.addCase(updateUploadFile.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteUploadFile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteUploadFile.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.uploadFiles = state.uploadFiles.filter(
          ({ id }) => id !== payload
        );
        state.error = null;
      }
    );

    builder.addCase(deleteUploadFile.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * soert Vision Mission
     * -------------------------------------------------
     */
    builder.addCase(sortUploadFile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sortUploadFile.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(sortUploadFile.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentUploadFile, sortUploadFiles } =
  uploadFileSlice.actions;

export const uploadFileReducer = uploadFileSlice.reducer;
