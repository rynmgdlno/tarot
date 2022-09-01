import { combineReducers } from "redux";

import userModal from './userModal/userModalSlice'
import palettesModal from './palettesModal/palettesSlice'
import saveModal from './saveModal/saveSlice'

export default combineReducers({
  userModal,
  palettesModal,
  saveModal,
  // helpModal
})