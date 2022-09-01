import { combineReducers } from "redux";

import currentUser from './currentUserSlice'
import savedPalettes from './savedPalettesSlice'
import api from "./apiSlice";

export default combineReducers({
  api,
  currentUser,
  savedPalettes
})
