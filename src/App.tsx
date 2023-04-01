import { useState, useEffect } from 'react'
import {useAppDispatch, useAppSelector} from './app/hooks'
import RedditAPIView from './features/redditAPI/redditApiView'
import SelectSubRedditBtn from './components/SelectSubRedditBtn/SelectSubRedditBtn'
import Nav from './components/Nav/Nav'


import './styles/main.css'

function App() {


  


  return (
    <div className='top-div'>
      <div className='nav-container'>
        <Nav/>
      </div>
      <div className='main-body'>
      <RedditAPIView/>  
      </div>
      
    </div>
  )
}

export default App
