import { combineReducers } from "redux";

import channelEditor from './color/editor/slider/channelEditorSlice'
import colorSliderReducer from './color/colorSliderSlice'
import editor from './editorSliderSlice'

export default combineReducers({
  channelEditor,
  colorSliderReducer,
  editor
})