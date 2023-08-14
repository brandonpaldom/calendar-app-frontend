import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateDialogOpen: false,
  },
  reducers: {
    handleOpenDateDialog: (state) => {
      state.isDateDialogOpen = true
    },
    handleCloseDateDialog: (state) => {
      state.isDateDialogOpen = false
    },
  },
})

export const { handleOpenDateDialog, handleCloseDateDialog } = uiSlice.actions

export default uiSlice.reducer
