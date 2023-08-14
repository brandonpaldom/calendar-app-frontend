import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import CalendarDialog from '../components/CalendarDialog'
import CalendarEvent from '../components/CalendarEvent'
import FabAddNew from '../components/FabAddNew'
import FabDelete from '../components/FabDelete'
import Navbar from '../components/Navbar'
import { localizer, getMessages } from '../../helpers'
import { useUIStore, useCalendarStore, useAuthStore } from '../../hooks'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function CalendarPage() {
  const { user } = useAuthStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { openDateDialog } = useUIStore()
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month',
  )

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = user.uid === event.user._id || user.uid === event.user.uid
    const isPast = new Date() > event.end
    const style = {
      backgroundColor: isMyEvent ? '#3b82f6' : '#dbeafe',
      color: isMyEvent ? 'white' : '#3b82f6',
      fontSize: '0.875rem',
      fontWeight: '500',
      borderRadius: '0.25rem',
      padding: '0.5rem',
      border: 'none',
      ...(isSelected && {
        backgroundColor: isMyEvent ? '#2563eb' : '#bfdbfe',
      }),
      ...(isPast && {
        backgroundColor: '#f5f5f5',
        color: '#737373',
      }),
    }

    return { style }
  }

  const handleDoubleClick = () => {
    openDateDialog()
  }

  const handleSelectEvent = (e) => {
    setActiveEvent(e)
  }

  const handleView = (e) => {
    localStorage.setItem('lastView', e)
    setLastView(e)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar />
      <div className="p-6">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          messages={getMessages()}
          style={{ height: 'calc(100dvh - 112px)' }}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          onDoubleClickEvent={handleDoubleClick}
          onSelectEvent={handleSelectEvent}
          onView={handleView}
        />
      </div>
      <CalendarDialog />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
