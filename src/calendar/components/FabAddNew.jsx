import { addHours } from 'date-fns'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useCalendarStore, useUIStore } from '../../hooks'

export default function FabAddNew() {
  const { openDateDialog } = useUIStore()
  const { setActiveEvent } = useCalendarStore()

  const handleAddEvent = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 1),
      user: {
        _id: '123',
        name: 'John Doe',
      },
    })
    openDateDialog()
  }

  return (
    <button
      className="fab-btn btn-primary bottom-6 right-6"
      onClick={handleAddEvent}
    >
      <PlusIcon className="w-6 h-6" />
    </button>
  )
}
