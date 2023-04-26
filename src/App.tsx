import { useState, useEffect } from 'react'
import {useAppDispatch, useAppSelector} from './app/hooks'
import RedditArticlesView from './features/redditArticles/redditArticlesView'
import SelectSubRedditBtn from './components/SelectSubRedditBtn/SelectSubRedditBtn'
import Nav from './components/Nav/Nav'


import './styles/main.css'

function App() {


  


  return (
    <div className='top-div'>
      <div className='nav-container'>
        <Nav/>
      </div>
      <div className='sub-header-container'>
        
      </div>
      <div className='main-body'>
        <div>

        </div>
      <RedditArticlesView/>  
      </div>
      
    </div>
  )
}

export default App
