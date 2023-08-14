import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice'
import calendarReducer from '../features/calendar/calendarSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
