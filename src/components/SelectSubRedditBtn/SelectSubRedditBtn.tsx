import React, {useState} from 'react'
import {BsArrowDownRightCircleFill} from 'react-icons/bs'
import { useAppSelector } from '../../app/hooks'

const SelectSubRedditBtn = ({sideBarActive, setSideBarActive}) => {


  const [style, setStyle] = useState('inactive')

  const subreddit = useAppSelector(state => state.subReddit.subRedditName)


  
  
  const handleClick = () => {
    setSideBarActive(!sideBarActive)
    const transformStyle = sideBarActive ? 'active' : 'inactive';
    setStyle(transformStyle)
  }
  

  
    return (
    <button 
        className="select-sub-btn"
        onClick={handleClick}>
            {subreddit} <BsArrowDownRightCircleFill  className={style} />
        
    </button>
  )
}

export default SelectSubRedditBtn