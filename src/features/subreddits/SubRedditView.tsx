import React, {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import subredditSlice, { selectSubReddit } from './subRedditSlice';
import { RootState } from '../../app/store';
import { fetchArticles } from '../redditAPI/redditArticles';

const SubRedditView = ({sideBarActive}) => {

    const dispatch = useAppDispatch()

    const [style, setStyle] = useState('inactive')

    // type SubRedditType = 'worldnews' | 'news' | 'politics' | 'ukpolitics' | 'askreddit' | '' 



    useEffect(() => {
      sideBarActive ? setStyle('sr-menu active') : setStyle('sr-menu inactive');
    }, [sideBarActive])

    const subRedditList = ['worldnews', 'news', 'politics', 'ukpolitics', 'askreddit']
    
    const subReddit = useAppSelector((state:RootState) => state.subReddit.subRedditName);


    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let subreddit = e.currentTarget.value
        dispatch(selectSubReddit(subreddit))
    }

    
  return (
            
            <ul className={style}>
                {subRedditList.map((subRedditName, i) => (
                    <li className='srm-btn-container' key={i}>
                        <button 
                            value={subRedditName} 
                            onClick={handleClick}
                            className="srm-btn"
                                >{subRedditName}
                        </button>
                    </li>
                ))}
            </ul>
  )
}

export default SubRedditView