import { Fragment, useEffect, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { addHours, differenceInSeconds } from 'date-fns'
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'
import { useCalendarStore, useUIStore } from '../../hooks'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'react-datepicker/dist/react-datepicker.css'

export default function CalendarDialog() {
  const { isDateDialogOpen, closeDateDialog } = useUIStore()
  const { activeEvent, startSavingEvent } = useCalendarStore()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
  })

  const titleError = useMemo(() => {
    if (!formSubmitted) return ''
    if (formValues.title.trim() === '') return 'Title is required'
  }, [formSubmitted, formValues.title])

  useEffect(() => {
    if (activeEvent === null) return
    setFormValues({ ...activeEvent })
  }, [activeEvent])

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleDateChange = (date, name) => {
    setFormValues({
      ...formValues,
      [name]: date,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    const difference = differenceInSeconds(formValues.end, formValues.start)
    if (isNaN(difference) || difference < 0) {
      Swal.fire({
        title: 'Wrong dates',
        text: 'The end date must be after the start date',
        icon: 'error',
      })
      return
    }
    if (formValues.title.trim() === '') return
    await startSavingEvent(formValues)
    closeDateDialog()
    setFormSubmitted(false)
  }

  return (
    <Transition appear show={isDateDialogOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDateDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-lg p-6 flex flex-col gap-4 w-full max-w-[480px]">
                <h2>New event</h2>
                <form
                  className="grid grid-cols-1 gap-6"
                  onSubmit={handleSubmit}
                >
                  <label className="block">
                    <span className="text-neutral-700">Title</span>
                    <input
                      type="text"
                      className={`input ${titleError ? 'input-error' : ''}`}
                      name="title"
                      value={formValues.title}
                      onChange={handleChange}
                    />
                    {titleError && (
                      <span className="input-error-message">{titleError}</span>
                    )}
                  </label>
                  <label className="block">
                    <span className="text-neutral-700">Notes (optional)</span>
                    <textarea
                      className="input"
                      name="notes"
                      value={formValues.notes}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-neutral-700">
                      Start date and time
                    </span>
                    <DatePicker
                      selected={formValues.start}
                      className="input"
                      onChange={(e) => handleDateChange(e, 'start')}
                      dateFormat="Pp"
                      showTimeSelect
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-neutral-700">End date and time</span>
                    <DatePicker
                      minDate={formValues.start}
                      selected={formValues.end}
                      className="input"
                      onChange={(e) => handleDateChange(e, 'end')}
                      dateFormat="Pp"
                      showTimeSelect
                    />
                  </label>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
