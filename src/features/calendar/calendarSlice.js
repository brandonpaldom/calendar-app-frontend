import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    handleSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
    handleAddNewEvent: (state, { payload }) => {
      state.events.push(payload)
      state.activeEvent = null
    },
    handleUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload
        } else {
          return event
        }
      })
    },
    handleDeleteEvent: (state) => {
      if (!state.activeEvent) return
      state.events = state.events.filter(
        (event) => event.id !== state.activeEvent.id,
      )
      state.activeEvent = null
    },
    handleLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false
      payload.forEach((event) => {
        const eventExists = state.events.some(
          (stateEvent) => stateEvent.id === event.id,
        )
        if (!eventExists) {
          state.events.push(event)
        }
      })
    },
    handleLogoutCalendar: (state) => {
      state.isLoadingEvents = true
      state.events = []
      state.activeEvent = null
    },
  },
})

export const {
  handleSetActiveEvent,
  handleAddNewEvent,
  handleUpdateEvent,
  handleDeleteEvent,
  handleLoadEvents,
  handleLogoutCalendar,
} = calendarSlice.actions

export default calendarSlice.reducer
