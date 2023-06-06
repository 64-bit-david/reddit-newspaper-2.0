import { useState, useEffect } from 'react'
import {useAppDispatch, useAppSelector} from './app/hooks'
import RedditArticlesView from './features/redditArticles/redditArticlesView'
import SelectSubRedditBtn from './components/SelectSubRedditBtn/SelectSubRedditBtn'
import Nav from './components/Nav/Nav'


import './styles/main.css'
import SubHeader from './components/SubHeader/SubHeader'
import Footer from './components/Footer/Footer'

function App() {


  


  return (
    <div className='top-div'>
      <div className='nav-container'>
        <Nav/>
      </div>
      <SubHeader/>
      <div className='main-body'>
        <div>

        </div>
      <RedditArticlesView/>  
      </div>
      <Footer/>
      
    </div>
  )
}

export default App
