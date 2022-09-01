import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSwipeable } from 'react-swipeable'

import { colorDataSelector } from './editor/slider/channelEditorSlice'
import { editorSelector, slideEditor } from '../editorSliderSlice'
import { menuSelector, menuToggle } from '../../menu/menuSlider/menuSliderSlice'
import { searchSelector, setSearchField } from '../../top-bar/topBarSlice'

import { luminosityTest, makeHex } from '../../../../utility-functions'

import './color.scss'
import './color-animate.css'

const Color = ({ className, children, id, swipeLeft, swipeRight }) => {
  const dispatch = useDispatch()
  const colorData = useSelector(colorDataSelector)
  const editorOpen = useSelector(editorSelector)
  const menuToggled = useSelector(menuSelector)
  const searchToggled = useSelector(searchSelector)
  const { red, green, blue } = colorData[id]
  const foreColor = luminosityTest(colorData[id])
  const bgColor = { backgroundColor: `rgb(${red}, ${green}, ${blue})` }
  const hex = makeHex([red, green, blue])

  const handlers = useSwipeable({
    onSwipedRight: () => swipeRight(),
    onSwipedLeft: () => swipeLeft()
  })

  const toggleEditor = (id) => {
    if (editorOpen !== null && editorOpen === id) {
      dispatch(slideEditor(false))
    } else {
      dispatch(slideEditor(id))
      if (menuToggled) dispatch(menuToggle(false))
      if (searchToggled) dispatch(setSearchField())
    }
  }

  return (
    <div
      onClick={() => toggleEditor(id)}
      className={className} style={bgColor}
    >
      {
        editorOpen === id ?
        <div className='indicator-container' {...handlers}>
          <span className='hex' style={{ color: foreColor }}>{hex}</span>
          <div className='indicator' style={{ backgroundColor: foreColor }} />
        </div>
        :
        <div className='indicator-container' {...handlers} />
      }
      {children}
    </div>
  )
}

export default Color