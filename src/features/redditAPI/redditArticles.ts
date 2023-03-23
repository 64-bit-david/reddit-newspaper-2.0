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

//fetch and return relevant data in the form of an article
export const fetchArticles = createAsyncThunk(
  "redditApi/fetchArticles",
  async (subreddit: string) => {
    // request trending posts from subreddit endpoint
    const subRedditEndPoint = `/r/${subreddit}.json`;
    const subRedditMetaData = await fetchReddit.get(subRedditEndPoint);

    const subRedditPosts: [] = subRedditMetaData.data.data.children;

    // remove any deleted, sticked, nsfw posts etc
    const filteredSubRedditPosts = subRedditPosts.filter(
      (subRedditPost: any) => {
        return (
          !subRedditPost.data.stickied &&
          subRedditPost.data.stickied !== "BOT" &&
          subRedditPost.data.body !== "[removed]" &&
          subRedditPost.data.over_18 === false
        );
      }
    );

    // get an array of all ids of posts that we want
    const postIds = filteredSubRedditPosts.map((item: any) => item.data.id);

    // helper function to fetch article data
    //returns only data we need to create article
    const fetchArticle = async (postId: string) => {
      const articleEndPoint = `/r/${subreddit}/${postId}.json`;

      try {
        const res = await fetchReddit.get(articleEndPoint);
        const title = res.data[0].data.children[0].data.title;
        const comments = res.data[1].data.children.slice(0, 2);

        //  filter out any uncessary comments, anything else we dont want
        //  then return top 2 (reddit api sorts by most popular by default)

        const filteredComments = comments.reduce(
          (filtered: any, comment: any) => {
            if (
              !comment.data.sticked &&
              comment.data.author_flair_text !== "BOT" &&
              comment.data.body !== "[removed]"
            ) {
              const filteredComment: any = {};
              filteredComment.body = comment.data.body;
              filteredComment.createdAt = comment.data.created;
              filteredComment.author = comment.data.author;
              filteredComment.url = comment.data.permalink;
              if (filteredComment.body.slice(0, 4) === "&gt;") {
                filteredComment.body = filteredComment.body.slice(4);
              }
              filtered.push(filteredComment);
            }
            return filtered;
          },
          []
        );

        // const commentsWithStickedRemoved = comments.filter(
        //   (comment: any): any => {
        //     return (
        //       !comment.data.stickied &&
        //       comment.data.author_flair_text !== "BOT" &&
        //       comment.data.body !== "[removed]"
        //     );
        //   }
        // ).map(comment) => {

        // };

        const article = {
          articleTitle: title,
          articleComments: filteredComments,
          articleMeta: res.data[1].data,
        };
        return article;
      } catch (err) {
        console.log(err);
      }
    };

    // fetch title and comments for each id
    const fetchArticles = async (postIds: string[]) => {
      const promises = postIds.map(async (id) => {
        const article = await fetchArticle(id);
        return article;
      });
      const articles = Promise.all(promises);
      return articles;
    };

    const articles = fetchArticles(postIds);
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
