import { TrashIcon } from '@heroicons/react/24/solid'
import { useCalendarStore } from '../../hooks'

export default function FabDelete() {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore()

  const handleDeleteEvent = () => {
    startDeletingEvent()
  }

  if (!hasEventSelected) return null

  return (
    <button
      className="fab-btn btn-error bottom-6 left-6"
      onClick={handleDeleteEvent}
    >
      <TrashIcon className="w-6 h-6" />
    </button>
  )
}
