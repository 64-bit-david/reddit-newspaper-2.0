import React, {useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import subredditSlice, { selectSubReddit } from './subRedditSlice';
import { RootState } from '../../app/store';
import { fetchArticles } from '../redditAPI/redditArticles';

const SubRedditView = () => {

    const dispatch = useAppDispatch()

    // type SubRedditType = 'worldnews' | 'news' | 'politics' | 'ukpolitics' | 'askreddit' | '' 

    const subRedditList = ['worldnews', 'news', 'politics', 'ukpolitics', 'askreddit']


    const subReddit = useAppSelector((state:RootState) => state.subReddit);


    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let subreddit = e.currentTarget.value
        dispatch(selectSubReddit(subreddit))
        dispatch(fetchArticles())
    }

    
  return (
    <div>
        <ul>
            {subRedditList.map((subRedditName, i) => (
                <div key={i}>
                    <button value={subRedditName} onClick={handleClick}>{subRedditName}</button>
                </div>
            ))}
        </ul>
    </div>
  )
}

export default SubRedditView