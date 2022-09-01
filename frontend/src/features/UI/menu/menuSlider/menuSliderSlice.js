import { createSlice } from "@reduxjs/toolkit";

export const menuSliderSlice = createSlice({
  name: 'menuToggle',
  initialState: { menuToggled: null },
  reducers: {
    menuToggle: (state) => {
      state.menuToggled = !state.menuToggled
    }
  }
})

export const menuSelector = state => state.ui.menuToggle.menuToggled
export const { menuToggle } = menuSliderSlice.actions
export default menuSliderSlice.reducer