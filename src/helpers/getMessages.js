export const getMessages = () => {
  return {
    allDay: 'All Day',
    previous: '<-',
    next: '->',
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Time',
    event: 'Event',
    noEventsInRange: 'There are no events in this range.',
    showMore: (total) => `+${total} more`,
  }
}
