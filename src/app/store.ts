import { configureStore } from "@reduxjs/toolkit";
import redditArticlesReducer from "../features/redditArticles/redditArticles";
import subRedditReducer from "../features/subreddits/subRedditSlice";
export const store = configureStore({
  reducer: {
    subReddit: subRedditReducer,
    articles: redditArticlesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
