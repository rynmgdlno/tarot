import { combineReducers } from "redux";

import composer from './composer/composerReducer'
import darkMode from './darkMode/darkModeSlice'
import menuToggle from './menu/menuSlider/menuSliderSlice'
import modals from './modals/modalsReducer'
import swipe from "./swipe/swipeSlice";
import topBar from './top-bar/topBarSlice'

export default combineReducers({
  composer,
  darkMode,
  menuToggle,
  modals,
  swipe,
  topBar
})