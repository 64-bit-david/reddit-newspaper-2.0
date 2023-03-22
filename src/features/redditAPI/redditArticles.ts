import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchReddit from "../../apis/fetchReddit";
import { store } from "../../app/store";

interface ArticleComment {
  comment: string;
  user: string;
  url: string;
  timeStamp: string;
}

interface Article {
  title: string;
  comments: ArticleComment[];
  url: string;
}

interface InitialState {
  loading: boolean;
  data: Article[];
  error: string;
}

const initialState: InitialState = {
  loading: false,
  data: [],
  error: "",
};

//need to get subreddit state into here?
export const fetchArticles = createAsyncThunk(
  "redditApi/fetchArticles",
  async () => {
    // const subreddit = store.getState().subReddit;
    // const subRedditEndPoint = `/r/${subreddit}.json`;
    const subRedditEndPoint = "/r/worldnews";

    // request trending posts from subreddit endpoint
    const subRedditMetaData = await fetchReddit.get(
      `${subRedditEndPoint}.json`
    );

    const subRedditData: [] = subRedditMetaData.data.data.children;

    // get an array of all ids of posts that we want
    const postIds = subRedditData.map((item: any) => item.data.id);

    // helper function to fetch article data
    //returns only data we need to create article
    const fetchArticle = async (postId: string) => {
      const urlEndPoint = `${subRedditEndPoint}/${postId}.json`;

      try {
        const res = await fetchReddit.get(urlEndPoint);
        const title = res.data[0].data.children[0].data.title;
        const comments = res.data[1].data.children;

        //  filter out any uncessary comments
        //  then return top 2 (reddit api sorts by most popular by default)
        const commentsWithStickedRemoved = comments
          .filter((comment: any): any => {
            return (
              !comment.data.stickied &&
              comment.data.author_flair_text !== "BOT" &&
              comment.data.body !== "[removed]"
            );
          })
          .slice(0, 2);

        //article should have two comments from the post - For Now
        const article = {
          articleTitle: title,
          articleComments: comments,
          articleMeta: res.data[1].data,
        };
        console.log(article);
        return article;
      } catch (err) {
        console.log(err);
      }
    };

    // fetch title and comments for each id

    const articles = postIds.map(async (id) => {
      const articleData = await fetchArticle(id);
      return articleData;
    });

    return articles;
  }
);

const redditArticles = createSlice({
  name: "redditApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchArticles.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = "");
      }
    );
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message || "something went wrong";
    });
  },
});

export default redditArticles.reducer;
