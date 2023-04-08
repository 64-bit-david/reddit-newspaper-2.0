import React, {useState, useEffect} from 'react'
import {TbArrowBadgeRight} from 'react-icons/tb'
import { useAppSelector } from '../../app/hooks'

interface SubRedditBtnProps {
  sideBarActive: boolean;
  setSideBarActive: React.Dispatch<React.SetStateAction<boolean>>;
  iconStyle: string;
  setIconStyle: React.Dispatch<React.SetStateAction<string>>;
}

const SelectSubRedditBtn: React.FC<SubRedditBtnProps> = 
    ({sideBarActive, setSideBarActive, iconStyle, setIconStyle}) => {



  const subreddit = useAppSelector(state => state.subReddit.subRedditName)


  
  
  const handleClick = () => {
    setSideBarActive(!sideBarActive)
    // const transformStyle = sideBarActive ? 'icon active' : 'icon inactive';
    setIconStyle(sideBarActive ? 'icon inactive' : 'icon active');
    // setStyle(transformStyle)
  }

  useEffect(() => {
    if (iconStyle === 'icon active'){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'unset'
    }
 }, [iconStyle ]);
  

  
    return (
    <div className="select-sub-btn-container">
      <button 
          type="button"
          className="select-sub-btn btn"
          onClick={handleClick}>
              {`/r/${subreddit}`} 
              <TbArrowBadgeRight  className={`${iconStyle} icon right-icon`}  />
              <TbArrowBadgeRight  className={`${iconStyle} icon left-icon`} />
          
      </button>
    
    </div>
  )
}

export default SelectSubRedditBtn