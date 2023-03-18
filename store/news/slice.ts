import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { News } from "./model";
import { createNews, deleteNews, fetchNews, updateNews } from "./thunk";

const initialState = {
  loading: false,
  news: [] as News[],
  error: null as null | string,
  currentNewsId: null as null | string,
  currentNews: null as null | News,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setCurrentNews: (
      state,
      { payload }: PayloadAction<string | null | undefined>
    ) => {
      state.currentNewsId = payload || null;
      state.currentNews = state.news.find(({ id }) => id === payload) || null;
    },
  },
  extraReducers: (builder) => {
    /**
     * -------------------------------------------------
     * fetch all news
     * -------------------------------------------------
     */
    builder.addCase(fetchNews.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchNews.fulfilled,
      (state, { payload }: PayloadAction<News[]>) => {
        state.loading = false;
        state.news = payload;
        state.error = null;
      }
    );

    builder.addCase(fetchNews.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * create news
     * -------------------------------------------------
     */
    builder.addCase(createNews.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createNews.fulfilled,
      (state, { payload }: PayloadAction<News>) => {
        state.loading = false;
        state.news = [...state.news, payload];
        state.error = null;
      }
    );

    builder.addCase(createNews.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * update news
     * -------------------------------------------------
     */
    builder.addCase(updateNews.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateNews.fulfilled,
      (state, { payload }: PayloadAction<News>) => {
        state.loading = false;
        state.news = state.news.map((news) => {
          if (news.id === payload.id) return payload;
          return news;
        });
        state.error = null;
      }
    );

    builder.addCase(updateNews.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });

    /**
     * -------------------------------------------------
     * delete news
     * -------------------------------------------------
     */
    builder.addCase(deleteNews.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteNews.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.loading = false;
        state.news = state.news.filter(({ id }) => id !== payload);
        state.error = null;
      }
    );

    builder.addCase(deleteNews.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message || "Error";
    });
  },
});

export const { setCurrentNews } = newsSlice.actions;

export const newsReducer = newsSlice.reducer;
