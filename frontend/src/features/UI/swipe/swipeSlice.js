import { createSlice } from '@reduxjs/toolkit'

export const swipeSlice = createSlice({
  name: 'swipeSlice',
  initialState: {
    activeResult: 0,
    currentPage: 1,
    resultLength: null
  },
  reducers: {
    setActiveResult: (state, action) => {
      state.activeResult = action.payload
    },
    decrementActive: (state) => {
      state.activeResult -= 1
    },
    incrementActive: (state) => {
      state.activeResult += 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setResultLength: (state, action) => {
      state.resultLength = action.payload
    }
  },
})

export const activeResultSelector = state => state.ui.swipe.activeResult
export const currentPageSelector = state => state.ui.swipe.currentPage
export const resultLengthSelector = state => state.ui.swipe.resultLength

export const { decrementActive, incrementActive, setActiveResult, setCurrentPage, setResultLength } = swipeSlice.actions
export default swipeSlice.reducer