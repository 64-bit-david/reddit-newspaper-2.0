import React, {useState, useEffect} from 'react';
import { useAppDispatch} from '../../app/hooks';
import  { selectSubReddit } from './subRedditSlice';


interface SubRedditViewProps {
    sideBarActive: boolean;
    setSideBarActive: React.Dispatch<React.SetStateAction<boolean>>;

    iconStyle: string;
    setIconStyle: React.Dispatch<React.SetStateAction<string>>;
  }

const SubRedditView:  React.FC<SubRedditViewProps> = (
    {sideBarActive, setSideBarActive, iconStyle, setIconStyle}) => {

    const dispatch = useAppDispatch()

    const [style, setStyle] = useState('inactive')

    // type SubRedditType = 'worldnews' | 'news' | 'politics' | 'ukpolitics' | 'askreddit' | '' 



    useEffect(() => {
      sideBarActive ? setStyle('sr-menu active') : setStyle('sr-menu inactive');
    }, [sideBarActive])

    const subRedditList = ['worldnews', 'news', 'politics', 'ukpolitics', 'askreddit']
    
    // const subReddit = useAppSelector((state:RootState) => state.subReddit.subRedditName);


    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let subreddit = e.currentTarget.value
        dispatch(selectSubReddit(subreddit))
        setSideBarActive(!sideBarActive)
        setIconStyle('icon inactive')
    }

    
  return (
            <div className={style}>
                <h4>
                    SELECT A SUBREDDIT
                </h4>
                <ul>
                    {subRedditList.map((subRedditName, i) => (
                        <li className='srm-btn-container' key={i}>
                            <button 
                                value={`${subRedditName}`} 
                                onClick={handleClick}
                                className="srm-btn btn"
                                    >{`/r/${subRedditName}`}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
  )
}

export default SubRedditView