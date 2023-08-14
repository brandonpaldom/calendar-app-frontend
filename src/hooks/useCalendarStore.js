import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {
  handleAddNewEvent,
  handleDeleteEvent,
  handleLoadEvents,
  handleSetActiveEvent,
  handleUpdateEvent,
} from '../features/calendar/calendarSlice'
import calendarApi from '../api/calendarApi'
import { convertEventsToDateEvents } from './convertEventsToDateEvents'

export function useCalendarStore() {
  const { events, activeEvent } = useSelector((state) => state.calendar)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvent) => {
    dispatch(handleSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(handleUpdateEvent({ ...calendarEvent, user }))
        Swal.fire('Success', 'Event updated', 'success')
        return
      }
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(handleAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
      Swal.fire('Success', 'Event created', 'success')
    } catch (error) {
      Swal.fire('Error', error.response.data.message, 'error')
    }
  }

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(handleDeleteEvent())
      Swal.fire('Success', 'Event deleted', 'success')
    } catch (error) {
      Swal.fire('Error', error.response.data.message, 'error')
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDateEvents(data.events)
      dispatch(handleLoadEvents(events))
    } catch (error) {
      console.log(error)
    }
  }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  }
}
