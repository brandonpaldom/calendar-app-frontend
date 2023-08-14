import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    checking: (state) => {
      state.status = 'checking'
      state.user = {}
      state.errorMessage = undefined
    },
    login: (state, action) => {
      state.status = 'authenticated'
      state.user = action.payload
      state.errorMessage = undefined
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated'
      state.user = {}
      state.errorMessage = payload
    },
    clearError: (state) => {
      state.errorMessage = undefined
    },
  },
})

export const { checking, login, logout, clearError } = authSlice.actions

export default authSlice.reducer
