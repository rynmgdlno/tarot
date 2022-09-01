import { createSlice } from '@reduxjs/toolkit'

export const editorSliderSlice = createSlice({
  name: 'slideEditor',
  initialState: { editorOpen: null },
  reducers: {
    slideEditor: (state, action) => {
      state.editorOpen = action.payload
    }
  },
})

export const editorSelector = (state) => state.ui.composer.editor.editorOpen
export const { slideEditor } = editorSliderSlice.actions
export default editorSliderSlice.reducer