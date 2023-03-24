import { useState, useEffect } from 'react'
import {useAppDispatch, useAppSelector} from './app/hooks'
import RedditArticles from './features/redditAPI/redditApiView'
import SelectSubRedditBtn from './components/SelectSubRedditBtn/SelectSubRedditBtn'
import Nav from './components/Nav/Nav'


import './styles/main.css'

function App() {


  


  return (
    <div className='root-body'>
      <div className='nav-container'>
        <Nav/>
      </div>
      <RedditArticles/>
      
      
    </div>
  )
}

export default App
