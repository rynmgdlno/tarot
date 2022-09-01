import { createSlice } from '@reduxjs/toolkit'

export const topBarSlice = createSlice({
  name: 'topBarSlice',
  initialState: { searchFieldToggled: null },
  reducers: {
    setSearchField: (state) => {
      state.searchFieldToggled = !state.searchFieldToggled
    }
  },
})

export const searchSelector = state => state.ui.topBar.searchFieldToggled
export const { setSearchField } = topBarSlice.actions
export default topBarSlice.reducer