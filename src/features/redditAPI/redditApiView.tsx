import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArticles } from './redditArticles';

const redditAPIView = () => {

    //access dispatch methods
    const dispatch = useAppDispatch()

    //access articles state from reducer
    const articles = useAppSelector(state => state.articles.data)
    const subreddit = useAppSelector(state => state.subReddit.subRedditName)

    console.log(articles)

    useEffect(() => {
        //dispatch the action
        dispatch(fetchArticles(subreddit))

    }, [subreddit])
    


  
  return (
    <div>
      
    </div>
  )
}

export default redditAPIView