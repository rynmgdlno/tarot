import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Hamburger from 'hamburger-react'

import { darkModeSelector } from '../../darkMode/darkModeSlice'
import { editorSelector, slideEditor } from '../../composer/editorSliderSlice'
import { menuSelector, menuToggle } from './menuSliderSlice'
import { palettesToggledSelector, palettesToggle } from '../../modals/palettesModal/palettesSlice'
import { saveToggledSelector, toggleSave } from '../../modals/saveModal/saveSlice'
import { userModalSelector, userModalToggle } from '../../modals/userModal/userModalSlice'

import './menu-slider.scss'

const MenuSlider = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector(darkModeSelector)
  const editorOpen = useSelector(editorSelector)
  const menuToggled = useSelector(menuSelector)
  const palettesOpen = useSelector(palettesToggledSelector)
  const saveToggled = useSelector(saveToggledSelector)
  const userOpen = useSelector(userModalSelector)

  const fillColor = darkMode ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.5)'

  const setMenuToggle = () => {
    dispatch(menuToggle())
    if (editorOpen !== null) { dispatch(slideEditor(false)) }
    if (userOpen) { dispatch(userModalToggle()) }
    if (palettesOpen) { dispatch(palettesToggle()) }
    if (saveToggled) { dispatch(toggleSave())}
  }

  return (
    <div className='hamburger icon'>
      <Hamburger
        className='icon'
        color={fillColor}
        toggle={setMenuToggle}
        toggled={menuToggled}
        size={32}
      />
    </div>
  )
}

export default MenuSlider
