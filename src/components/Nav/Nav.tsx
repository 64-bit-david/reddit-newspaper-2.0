import React, { useState } from "react";
import SelectSubRedditBtn from "../SelectSubRedditBtn/SelectSubRedditBtn";
import SubRedditView from "../../features/subreddits/SubRedditView";

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const [sideBarActive, setSideBarActive] = useState<boolean>(false);
  const [iconStyle, setIconStyle] = useState<string>('icon inactive')


  return (
    <div className="nav">
      <div className="nav-left">
        <SelectSubRedditBtn
          sideBarActive={sideBarActive}
          setSideBarActive={setSideBarActive}
          iconStyle={iconStyle}
          setIconStyle={setIconStyle}
        />
      </div>
      <div className="nav-center">
        <h1>Reddit Newspaper</h1>
      </div>
      <div className="nav-right">
        <h5>CURRENT EDITION</h5>
      </div>
      <SubRedditView 
        sideBarActive={sideBarActive} 
        setSideBarActive={setSideBarActive}
        iconStyle={iconStyle}
        setIconStyle={setIconStyle}
        />
    </div>
  );
};


export default Nav;
