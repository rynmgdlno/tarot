import { createSlice } from '@reduxjs/toolkit'
import { lightTheme } from '../../../global/theme'

export const darkModeSlice = createSlice({
  name: 'setDarkMode',
  initialState: { 
    toggled: false,
    theme: lightTheme 
  },
  reducers: {
    setDarkMode: (state) => {
      state.toggled = !state.toggled
    },
    // setTheme: (state, action) => {
    //   state.theme = action.payload
    // }
  },
})

export const darkModeSelector = state => state.ui.darkMode.toggled
export const { setDarkMode } = darkModeSlice.actions
export default darkModeSlice.reducer