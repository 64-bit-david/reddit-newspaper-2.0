import {useState, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArticles, Article, ArticleComment } from './redditArticles';
import {BsArrowsAngleContract} from 'react-icons/bs';
import {FaExpand} from 'react-icons/fa';
import {IoMdContract, IoMdExpand} from 'react-icons/io';





const RedditArticlesView: React.FC = () => {

    
    

    //access dispatch methods
    const dispatch = useAppDispatch()

    //access articles state from reducer
    const articles = useAppSelector(state => state.articles.data)
    const subreddit = useAppSelector(state => state.subReddit.subRedditName)
    const isFetchingArticles = useAppSelector(state => state.articles.loading)


    const [currentTime, setCurrentTime] = useState(Date.now())
    const [fullArticleData, setFullArticleData] = useState<Article | null>(null)



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


      //small hf, if text is too long shorten and provide a link to reddit source
      const processComment = (commentText: string, commentUrl:string) => {

  
        if (commentText.length > 250){
          return(
            <p>{commentText.slice(0, 250)}... 
              <a className='reddit-comment-link' href={`https://www.reddit.com${commentUrl}`}>Continue on reddit</a>
            </p>
          )
        }else{
          return(
            <p>{commentText}</p>
          )
        } 


      }


    
    const renderMiniComment = (commentData: ArticleComment) => {

      
      const timeSinceComment = calculateTimeSince(currentTime, Number(commentData.createdAt))


      return(
        <div key={commentData.id} className='comment-container'>
          <div className='comment-head'>
            <p className='comment'>Reddit user 
              <strong> {commentData.author}</strong> says: 
            </p>
            <p className='time-since-comment'>{timeSinceComment}</p>
          </div>
          <div className="comment-body">
            {processComment(commentData.body, commentData.url)}
          </div>
        </div>
      )
    }

    
    const renderMiniArticleComments = (comments: ArticleComment[]) => {
      if(comments.length === 0){
        return(
          <p>No comments yet!</p>
        )
      }
      
      return comments.slice(0, 2).map((comment, i) => {          
        return renderMiniComment(comment)
      })
    }


    const renderFullArticleComments = (comments: ArticleComment[]) => {
      if(comments.length === 0){
        return(
          <p>No comments yet!</p>
        )
      }
      
      return comments.slice(0, 5).map((comment, i) => {          
        return renderMiniComment(comment)
      })
    }




    const renderMiniArticle = (article: Article, index: number) => {
          const articleHeadStyle = index === 0 ? "article headline" : "article"
            return (   
                <div key={article.id} className={articleHeadStyle}>
                  {/* {index===0 ? <h2 className='hd-story-title'>The Headline Story</h2>: null} */}
                  <h3 className='article-title'>
                    <a href={`https://reddit.com${article.url}`}>{article.title}</a>
                    <button 
                    className='article-expand-btn btn' 
                    type="button"
                    onClick={()=>setFullArticleData(article)}
                    >
                    <IoMdExpand/>
                  </button>
                  </h3>
                  
                  {renderMiniArticleComments(article.comments)}
                  {/* {index===0 ? <h4 className='hd-story-title'>Other Trending Stories</h4>: null} */}

                </div>
              )
    }
    
    
    // render expanded article will more information
    const renderFullArticle = () =>{
      if (!fullArticleData){
        return;
      }else{
        const timePosted = calculateTimeSince(Date.now(), Number(fullArticleData.createdAt));
        return (   
          <div key={fullArticleData.id} className='article full-article-container'>
            <div className="full-article">
            <h3 className='article-title'>
              <a href={`https://reddit.com${fullArticleData.url}`}>{fullArticleData.title}</a>
          
            </h3>
            <p className='article-time-posted'>{timePosted}</p>
            <h4 className='article-subheader'>What Reddit Users Are Saying:</h4>
            {renderFullArticleComments(fullArticleData.comments)}
            <div className='link-to-post-container'>
              <a 
                  href={fullArticleData.url}
                  className='link-to-post'
                  
                  >View all comments on reddit</a>
            </div>
              <button 
              className='article-expand-btn btn' 
              type="button"
              onClick={() => setFullArticleData(null)}
              >
              <IoMdContract/>
            </button>
            </div>
            
          </div>
        )
      }
      
    }
    
    const renderMiniArticles = (articles: Article[]) => {
      if (articles.length === 0) {
        return <div>no articles</div>;
      } else {
        return articles.map((article, index) => {
          return renderMiniArticle(article, index)
        });
      }
    };


    const renderLoader = () => {
        return(
          <div className='articles-loading'>
            Loading.......
          </div>
        )
    }


  
  return (
    <div className='articles-container'>
      { isFetchingArticles ? renderLoader() : renderMiniArticles(articles)}
      {renderFullArticle()}
    </div>
  )
}

export default RedditArticlesView;