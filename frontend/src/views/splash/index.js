import React from 'react'
import { Link } from 'react-router-dom'

import './splash.scss'

const Splash = () => {
  return (
    <div className='splash'>
      <h1>Welcome to <span>Tarot</span></h1>
      <h4>the lexical color palette generator</h4>
      <p>Enter a search word or short phrase and hit enter to generate an infinite number of palettes.</p>
      <p>Swipe left to right or use the arrow keys to browse through the results.</p>
      <p>Tap or click an individual color to adjust its RGB values.</p>
      <p>Create an account to save palettes and access them later.</p>
      {/* <p>- </p> */}
      <Link to='/tarot' className='link'><h2>Click here to get started!</h2></Link>
    </div>
  )
}

export default Splash