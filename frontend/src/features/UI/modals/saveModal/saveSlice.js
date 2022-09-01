import { createSlice } from '@reduxjs/toolkit'

export const saveModalSlice = createSlice({
  name: 'saveModal',
  initialState: { saveToggled: null },
  reducers: {
    toggleSave: (state) => {
      state.saveToggled = !state.saveToggled
    }
  },
})

export const saveToggledSelector = state => state.ui.modals.saveModal.saveToggled
export const { toggleSave } = saveModalSlice.actions
export default saveModalSlice.reducer