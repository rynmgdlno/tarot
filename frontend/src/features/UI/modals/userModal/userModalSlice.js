import { createSlice } from '@reduxjs/toolkit'

export const userModalSlice = createSlice({
  name: 'userModalToggle',
  initialState: {
    userToggled: null,
    user: null,
    thirdParty: false
  },
  reducers: {
    userModalToggle: (state) => {
      state.userToggled = !state.userToggled
    },
    //  userObject
    userName: (state, action) => {
      state.user = action.payload
    },
    // thirdParty
    setThirdParty: (state, action) => {
      state.thirdParty = action.payload
    }
  },
})

export const userModalSelector = state => state.ui.modals.userModal.userToggled
export const userNameSelector = state => state.ui.modals.userModal.user
export const thirdPartySelector = state => state.ui.modals.userModal.thirdParty

export const { userModalToggle, userName, setThirdParty } = userModalSlice.actions
export default userModalSlice.reducer