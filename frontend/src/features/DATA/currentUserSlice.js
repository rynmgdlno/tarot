import { createSlice } from "@reduxjs/toolkit";

export const currentUser = createSlice({
  name: 'currentUser',
  initialState: null,
  reducers: {
    setCurrentUser: (state, action) => {
      return state = action.payload
    }
  }
})

export const currentUserSelector = state => state.data.currentUser
export const { setCurrentUser } = currentUser.actions
export default currentUser.reducer

