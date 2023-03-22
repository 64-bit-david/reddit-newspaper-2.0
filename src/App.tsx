import { useState, useEffect } from 'react'
import {useAppDispatch, useAppSelector} from './app/hooks'
import SubRedditView from './features/subreddits/SubRedditView'
import RedditArticles from './features/redditAPI/redditApiView'

import './App.css'

function App() {

  return (
    <div className="App">
      <SubRedditView/>
      <RedditArticles/>
      
      
    </div>
  )
}

export default App
