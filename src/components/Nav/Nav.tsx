import React, {useState} from "react";
import SelectSubRedditBtn from "../SelectSubRedditBtn/SelectSubRedditBtn";
import SubRedditView from "../../features/subreddits/SubRedditView";

const Nav = () => {

  const [sideBarActive, setSideBarActive] = useState<boolean>(false)



  return <div className='nav'>
          <div className="nav-left">
            <SelectSubRedditBtn
                sideBarActive={sideBarActive}
                setSideBarActive={setSideBarActive}/>
            
          </div>
          <div className="nav-center">
            <h1>Reddit Newspaper</h1>
          </div>
          <div className="nav-right">
            <h5> CURRENT EDITION</h5>
          </div>
          <SubRedditView sideBarActive={sideBarActive}/>

        </div>;
};

export default Nav;
