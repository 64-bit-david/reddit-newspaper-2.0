import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArticles, Article, ArticleComment } from './redditArticles';



const redditAPIView = () => {

  

    //access dispatch methods
    const dispatch = useAppDispatch()

    //access articles state from reducer
    const articles = useAppSelector(state => state.articles.data)
    const subreddit = useAppSelector(state => state.subReddit.subRedditName)
    const isFetchingArticles = useAppSelector(state => state.articles.loading)

    // console.log(articles)

  

    useEffect(() => {
        //dispatch the action
        dispatch(fetchArticles(subreddit))

    }, [subreddit])
    
    const renderComment = (commentData: ArticleComment) => {
      return(
        <div key={commentData.id}>
          <p>{commentData.body}</p>
          <p>{commentData.author}</p>
          <p>{commentData.createdAt}</p>
          <p>{commentData.url}</p>
        </div>
      )
    }

    const renderArticleComments = (comments: ArticleComment[]) => {
      
      return comments.map((comment) => {
        return renderComment(comment)
          
      })
    } 
    
    const renderArticles = (articles: Article[]) => {
      if (articles.length === 0) {
        return <div>no articles</div>;
      } else {
        return articles.map((article) => {
          return (
            <div key={article.id}>
              <h3>{article.title}</h3>
              {renderArticleComments(article.comments)}
            </div>
          );
        });
      }
    };

  
  return (
    <div>
      
      { isFetchingArticles ? <div>Loading....</div> : renderArticles(articles)}    
    </div>
  )
}

export default redditAPIView