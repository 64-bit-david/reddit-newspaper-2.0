import {useState, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArticles, Article, ArticleComment } from './redditArticles';



const redditAPIView: React.FC = () => {

    
    

    //access dispatch methods
    const dispatch = useAppDispatch()

    //access articles state from reducer
    const articles = useAppSelector(state => state.articles.data)
    const subreddit = useAppSelector(state => state.subReddit.subRedditName)
    const isFetchingArticles = useAppSelector(state => state.articles.loading)


    const [currentTime, setCurrentTime] = useState(Date.now())



    useEffect(() => {
        //dispatch the action
        dispatch(fetchArticles(subreddit))
        setCurrentTime(Date.now())
    }, [subreddit])


    const calculateTimeSince = (currentTime: number, timePosted: number): string => {
      
      
      const currentDate = new Date(currentTime)
      const datePosted = new Date(timePosted * 1000) //need to multiply by 1000 for js date object to get current date

      //calculate difference between the two times in seconds
      const timeDiffInSeconds = (currentDate.getTime() - datePosted.getTime() ) / 1000

      const timeDiffInHours = timeDiffInSeconds / 3600



      if (timeDiffInHours < 1) {
        return `Posted less than 1 hour ago`
      } else if (timeDiffInHours < 24){
        const hours = Math.round(timeDiffInHours)
        return `Posted ${hours} hours ago`
      }else{
        return `Posted more than 1 day ago`
      }
    }


    
    const renderComment = (commentData: ArticleComment) => {
      const timeSinceComment = calculateTimeSince(currentTime, Number(commentData.createdAt))
      return(
        <div key={commentData.id}>
          <div className='comment-head'>
            <p>Reddit user 
              <strong> {commentData.author}</strong> says: 
            </p>
            <p>{timeSinceComment}</p>
          </div>
          <div className="comment-body">
            <p>{commentData.body}</p>
          </div>
          {/* <p>{commentData.url}</p> */}
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
        return articles.map((article, index) => {
          let articleClassName = "article"
          if (index === 0){
            return (   
                <div key={article.id} className={articleClassName}>
                  <h3 className='article-title headline'>
                    <a href={`https://reddit.com${article.url}`}>{article.title}</a>
                  </h3>
                  {renderArticleComments(article.comments)}
                </div>
                )
          }else{
            return (
              <div key={article.id} className={articleClassName}>
                <h3 className='article-title'>
                    <a href={`https://reddit.com${article.url}`}>{article.title}</a>
                  </h3>
                {renderArticleComments(article.comments)}
              </div>
            );
          }
          
        });
      }
    };

  
  return (
    <div className='articles-container'>
      { isFetchingArticles ? <div>Loading....</div> : renderArticles(articles)}    
    </div>
  )
}

export default redditAPIView