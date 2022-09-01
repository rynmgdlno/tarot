import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { darkModeSelector } from './features/UI/darkMode/darkModeSlice';

import Splash from './views/splash';
import Tarot from './views/tarot';

import './App.css';
import './global/global-styles.css'

const vh = window.innerHeight * .01;
document.documentElement.style.setProperty('--vh', `${vh}px`)

require('dotenv').config({
  path: '../.env'
})

function App() {
  const darkMode = useSelector(darkModeSelector)
  const bgColor = darkMode ? { backgroundColor: '#212121' } : { backgroundColor: '#FAFAFA' }
  
  return (
    <div
      className="App"
      style={bgColor}
    >
      <BrowserRouter basename='/'>
        <Route exact path='/' component={Splash} />
        <Route exact path='/tarot' component={Tarot} />
      </BrowserRouter>
    </div>
  );
}

export default App;
