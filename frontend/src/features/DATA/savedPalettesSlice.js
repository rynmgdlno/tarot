import { createSlice } from "@reduxjs/toolkit";

export const savedPalettes = createSlice({
  name: 'savedPalettes',
  initialState: null,
  reducers: {
    setSavedPalettes: (state, action) => {
      return state = action.payload
    }
  }
})

export const savedPalettesSelector = state => state.data.savedPalettes
export const { setSavedPalettes } = savedPalettes.actions
export default savedPalettes.reducer

