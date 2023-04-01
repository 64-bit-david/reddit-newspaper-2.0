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
      
      // const timeDiff: number = currentTime - (timePosted * 1000)
      
      const currentDate = new Date(currentTime)
      const datePosted = new Date(timePosted * 1000) //need to multiply by 1000 for js date object to get current date

      //calculate difference between the two times in seconds
      const timeDiffInSeconds = (currentDate.getTime() - datePosted.getTime() ) / 1000

      const timeDiffInHours = timeDiffInSeconds / 3600



      if (timeDiffInHours < 1) {
        return `Comment posted less than 1 hour ago`
      } else if (timeDiffInHours < 24){
        const hours = Math.round(timeDiffInHours)
        return `Comment posted ${hours} hours ago`
      }else{
        return `Comment posted more than 1 day ago`
      }
    }
    
    const renderComment = (commentData: ArticleComment) => {
      const timeSinceComment = calculateTimeSince(currentTime, Number(commentData.createdAt))
      console.log(timeSinceComment)
      return(
        <div key={commentData.id}>
          <p>{commentData.body}</p>
          <p>{commentData.author}</p>
          <p>{timeSinceComment}</p>
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