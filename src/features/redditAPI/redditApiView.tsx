import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArticles } from './redditArticles';

const redditApiView = () => {

    //access dispatch methods
    const dispatch = useAppDispatch()

    //access articles state from reducer
    const articles = useAppSelector(state => state.articles)
    const subreddit = useAppSelector(state => state.subReddit)

    useEffect(() => {
        //dispatch the action
        dispatch(fetchArticles())

    }, [subreddit])
    

    console.log(articles)


  return (
    <div>This is the articles component</div>
  )
}

export default redditApiView