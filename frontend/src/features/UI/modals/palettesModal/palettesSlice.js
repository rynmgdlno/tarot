import { createSlice } from '@reduxjs/toolkit'

export const savedPalettesSlice = createSlice({
  name: 'savedPalettes',
  initialState: {
    palettesToggled: null
  },
  reducers: {
    palettesToggle: (state) => {
      state.palettesToggled = !state.palettesToggled
    }
  },
})

export const palettesToggledSelector = state => state.ui.modals.palettesModal.palettesToggled
export const { palettesToggle } = savedPalettesSlice.actions
export default savedPalettesSlice.reducer