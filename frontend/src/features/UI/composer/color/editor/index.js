import React from 'react'

import { useSelector } from 'react-redux'

import { colorDataSelector } from './slider/channelEditorSlice'

import './editor.scss'
import './editor-animate.css'

const Editor = ({ children, className, id  }) => {
  const colorData = useSelector(colorDataSelector)
  const { red, green, blue } = colorData[id]
  const bgColor = { backgroundColor: `rgb(${red}, ${green}, ${blue})` }
  return (
    <div 
    onClick={(e) => e.stopPropagation()}
    className={className} style={bgColor}>
      {children}
    </div>
  )
}

export default Editor