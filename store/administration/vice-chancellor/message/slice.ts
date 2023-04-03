import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViceChancellorMessage } from "./model";
import {
  createMessage,
  deleteMessage,
  fetchMessages,
  updateMessage,
} from "./thunk";

const initialState = {
  loading: false,
  messages: [] as ViceChancellorMessage[],
  error: null as null | string,
  currentMessageId: null as null | string,
  currentMessage: null as null | ViceChancellorMessage,
};

const viceChancellorMessageSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {
    setCurrentMessage: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentMessageId = payload || null;
      state.currentMessage =
        state.messages.find(({ id }) => id === payload) || null;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all news
     * -------------------------------------------------
     */
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchMessages.fulfilled,
      (state, { payload }: PayloadAction<ViceChancellorMessage[]>) => {
        state.loading = false;
        state.messages = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchMessages.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createMessage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createMessage.fulfilled,
      (state, { payload }: PayloadAction<ViceChancellorMessage>) => {
        state.loading = false;
        state.messages = [...state.messages, payload];
        state.error = null;
      }
    );

    builder.addCase(createMessage.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateMessage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateMessage.fulfilled,
      (state, { payload }: PayloadAction<ViceChancellorMessage>) => {
        state.loading = false;
        state.messages = state.messages.map((message) => {
          if (message.id === payload.id) return payload;
          return message;
        });
        state.error = null;
      }
    );

    builder.addCase(updateMessage.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteMessage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteMessage.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.messages = state.messages.filter(({ id }) => id !== payload);
        state.error = null;
      }
    );

    builder.addCase(deleteMessage.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    // /**
    //  * -------------------------------------------------
    //  * soert Vision Mission
    //  * -------------------------------------------------
    //  */
    // builder.addCase(sortLogo.pending, (state) => {
    //   state.loading = true;
    // });

    // builder.addCase(sortLogo.fulfilled, (state) => {
    //   state.loading = false;
    //   state.error = null;
    // });

    // builder.addCase(sortLogo.rejected, (state, { error }) => {
    //   state.loading = false;
    //   state.error = error.message || "Error";
    // });
  },
});

export const { setCurrentMessage } = viceChancellorMessageSlice.actions;

export const viceChancellorMessageReducer = viceChancellorMessageSlice.reducer;
