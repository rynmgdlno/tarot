import React from 'react'

import './help-modal.scss'

const HelpModal = () => {
  return (
    <div className='help-modal-container'>
      <div className='help-modal'>
        <div className='help-page'>
          <p>
            Tarot is a Lexical color palette generator. In less fancy words that means it makes colors based on the words you tell it! Just click the search field in the top left and type in anything!</p><p>It's best to use adjectives or nouns that you might associate with certain colors instinctively. Go ahead and try "sunrise" or "peaceful" for instance.
          </p>
        </div>
        <div className='help-page'>
          <p>Tarot doesn't just generate one palette at a time either. Go ahead and swipe left or right (or use the arrow buttons on either side of the screen) to browse through endless results!</p>
        </div>
        <div className='help-page'>
          <p>See a palette you like but it's not quite right? Just tap (or click) on an individual color and you can edit it's RGB values to dial it in.</p>
        </div>
        <div className='help-page'>
          <p>Finally decided on the exact colors for that bathroom remodel or website design? Create an account and you can save your palette for later! Click on the menu button in the top right corner.</p>
        </div>
        <div className='help-page menu-page'>
          <p>Here you can access your account</p>
          <p>Once you have some palettes saved, you can find them here</p>
          <p>Tap on this guy to save a palette</p>
          <p>Toggle between light and dark modes</p>
          <p>Click here if you want to see this guide again</p>
        </div>
      </div>
    </div>
  )
}

export default HelpModal