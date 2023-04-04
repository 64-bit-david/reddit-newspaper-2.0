import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchReddit from "../../apis/fetchReddit";

export interface ArticleComment {
  id: string;
  body: string;
  author: string;
  url: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  comments: ArticleComment[];
  url: string;
  createdAt: string;
  meta: object;
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
        const articleURL = `https://www.reddit.com${articleEndPoint}`;
        const articleId = res.data[1].data.children[0].data.parent_id;
        const title = res.data[0].data.children[0].data.title;
        const createdAt = res.data[0].data.children[0].data.created;

        //Wont need this many comments, however some may be filterout out so limit some
        //Then less need to be processed and if one or two are filtered out there should
        //still be enough needed for the article
        const comments = res.data[1].data.children.slice(0, 8);

        //  filter out any uncessary comments, anything else we dont want
        //  then return top 2 (reddit api sorts by most popular by default)

        const filteredComments = comments.reduce(
          (filtered: any, comment: any) => {
            if (
              !comment.data.sticked &&
              comment.data.author_flair_text !== "BOT" &&
              comment.data.body !== "[removed]" &&
              comment.data.distinguished !== "moderator"
            ) {
              const filteredComment: ArticleComment = {
                id: comment.data.id,
                body: comment.data.body,
                createdAt: comment.data.created,
                author: comment.data.author,
                url: comment.data.permalink,
              };

              if (filteredComment.body.slice(0, 4) === "&gt;") {
                filteredComment.body = filteredComment.body.slice(4);
              }
              filtered.push(filteredComment);
            }
            return filtered.slice(0, 5);
          },
          []
        );

        const article: Article = {
          id: articleId,
          title: title,
          comments: filteredComments,
          url: articleURL,
          createdAt: createdAt,
          meta: res.data[1].data,
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
      (state, action: PayloadAction<(Article | undefined)[]>) => {
        (state.loading = false),
          //remove any undefined values
          (state.data = action.payload.filter(
            (article): article is Article => article !== undefined
          )),
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
