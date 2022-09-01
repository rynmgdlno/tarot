import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isLoadingSelector } from '../../DATA/apiSlice'
import { darkModeSelector } from '../darkMode/darkModeSlice'
import { menuSelector, menuToggle } from '../menu/menuSlider/menuSliderSlice'
import { palettesToggledSelector, palettesToggle } from '../modals/palettesModal/palettesSlice'
import { saveToggledSelector, toggleSave } from '../modals/saveModal/saveSlice'
import { searchSelector, setSearchField } from './topBarSlice'
import { userModalSelector, userModalToggle } from '../modals/userModal/userModalSlice'

import CustomButton from '../../../components/custom-button'
import MenuSlider from '../menu/menuSlider'
import Search from '../../../assets/icons/search.icon'
import Spinner from '../../../components/SVG/spinner'

import './top-bar.scss'
import SearchField from './searchField'

const TopBar = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(isLoadingSelector)
  const darkMode = useSelector(darkModeSelector)
  const menuToggled = useSelector(menuSelector)
  const palettesToggled = useSelector(palettesToggledSelector)
  const saveToggled = useSelector(saveToggledSelector)
  const searchToggled = useSelector(searchSelector)
  const userToggled = useSelector(userModalSelector)
  const searchRef = useRef()
  const fillColor = darkMode ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.5)'


  const showSearch = () => {
    dispatch(setSearchField())
    searchRef.current.focus()
    if (menuToggled) dispatch(menuToggle())
    if (userToggled) dispatch(userModalToggle())
    if (palettesToggled) dispatch(palettesToggle())
    if (saveToggled) dispatch(toggleSave())
  }

  return (
    <div className='top-bar'>
      {
        isLoading ? <Spinner className='spinner search-spinner'/> :
          <CustomButton
            className={searchToggled ?
              'search-button search-active' :
              `search-button`}
            type='submit'
            onClick={showSearch}>
            <Search className='icon search-icon' fillColor={fillColor} />
          </CustomButton>
      }
      <SearchField
        setSearchField={setSearchField}
        searchToggled={searchToggled}
        ref={searchRef}
      />
      <h1>Tarot</h1>
      <MenuSlider />
    </div>
  )
}

export default TopBar