import React, {useState} from 'react'
import {BsArrowDownRightCircleFill} from 'react-icons/bs'

const SelectSubRedditBtn = ({sideBarActive, setSideBarActive}) => {


  const [style, setStyle] = useState('inactive')

  
  
  const handleClick = () => {
    setSideBarActive(!sideBarActive)
    const transformStyle = sideBarActive ? 'active' : 'inactive';
    setStyle(transformStyle)
  }
  

  
    return (
    <button 
        className="select-sub-btn"
        onClick={handleClick}>
            subreddit <BsArrowDownRightCircleFill  className={style} />
        
    </button>
  )
}

export default SelectSubRedditBtn