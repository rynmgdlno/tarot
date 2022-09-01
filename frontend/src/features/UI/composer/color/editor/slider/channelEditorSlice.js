import { createSlice } from "@reduxjs/toolkit";
import initColor from '../../../../../../assets/static/init-color'

export const channelEditorSlice = createSlice({
  name: 'setColor',
  initialState: { colorData: initColor},
  reducers: {
    setColor: (state, action) => {
      state.colorData = action.payload
    }
  },
})

export const colorDataSelector = state => state.ui.composer.channelEditor.colorData
export const { setColor } = channelEditorSlice.actions
export default channelEditorSlice.reducer