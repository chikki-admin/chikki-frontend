import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    userId: '',
  },
  reducers: {
    updateToken: (state, userData) => {
        state.token = userData.payload.token
        state.userId = userData.payload.userId
    }
  },
})
export const { updateToken } = userSlice.actions
export default userSlice.reducer