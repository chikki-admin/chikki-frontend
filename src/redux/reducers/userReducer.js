import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: ''
  },
  reducers: {
    updateToken: (state, userData) => {
        state.token = userData.payload
    }
  },
})
export const { updateToken } = userSlice.actions
export default userSlice.reducer