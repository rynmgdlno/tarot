import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { currentUserSelector } from '../../DATA/currentUserSlice'
import { darkModeSelector, setDarkMode } from '../darkMode/darkModeSlice'
import { menuSelector } from '../menu/menuSlider/menuSliderSlice'
import { palettesToggledSelector, palettesToggle } from '../modals/palettesModal/palettesSlice'
import { saveToggledSelector, toggleSave } from '../modals/saveModal/saveSlice'
import { userModalSelector, userModalToggle } from '../modals/userModal/userModalSlice'

import CustomButton from '../../../components/custom-button'

import HelpIcon from '../../../assets/icons/help.icon'
import OpenIcon from '../../../assets/icons/open.icon'
import SaveIcon from '../../../assets/icons/save.icon'
import ThemeIcon from '../../../assets/icons/theme.icon'
import UserIcon from '../../../assets/icons/user.icon'

import './menu.scss'
import './menu-animate.css'

const Menu = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(currentUserSelector)
  const darkMode = useSelector(darkModeSelector)
  const menuToggled = useSelector(menuSelector)
  const palettesToggled = useSelector(palettesToggledSelector)
  const saveToggled = useSelector(saveToggledSelector)
  const userToggled = useSelector(userModalSelector)
  const menuInitialClass = menuToggled == null ? 'menu-animate-off' : 'menu-animate-return' 
  const fillColor = darkMode ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.5)'

  // Menu button actions
  const toggleUser = () => {
    dispatch(userModalToggle())
    if (palettesToggled) dispatch(palettesToggle())
    if (saveToggled) dispatch(toggleSave())
  }
  
  const togglePalettes = () => {
    dispatch(palettesToggle())
    if (userToggled) dispatch(userModalToggle())
    if (saveToggled) dispatch(toggleSave())
  }
  
  const toggleSaveModal = () => {
    dispatch(toggleSave())
    if (palettesToggled) dispatch(palettesToggle())
    if (userToggled) dispatch(userModalToggle())
  }

  const toggleDarkMode = () => {
    dispatch(setDarkMode())
  }

  return (
    <nav className={menuToggled ? 'menu menu-animate' : `menu ${menuInitialClass}`}>
      <CustomButton className='menu-button' onClick={toggleUser}>
        <UserIcon className='icon' fillColor={fillColor}/>
      </CustomButton>
      <CustomButton className='menu-button' onClick={togglePalettes} disabled={!currentUser}>
        <OpenIcon className='icon' fillColor={fillColor}/>
      </CustomButton>
      <CustomButton className='menu-button' onClick={toggleSaveModal} disabled={!currentUser}>
        <SaveIcon className='icon' fillColor={fillColor}/>
      </CustomButton>
      <CustomButton className='menu-button' onClick={toggleDarkMode}>
        <ThemeIcon className='icon' fillColor={fillColor}/>
      </CustomButton>
      <CustomButton className='menu-button' disabled={true}>
        <HelpIcon className='icon' fillColor={fillColor}/>
      </CustomButton>
    </nav>
  )
}

export default Menu