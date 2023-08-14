import PropTypes from 'prop-types'

export default function CalendarEvent({ event }) {
  const { title, user } = event

  return (
    <>
      <p>{title}</p>
      <p>@{user.name}</p>
    </>
  )
}

CalendarEvent.propTypes = {
  event: PropTypes.object.isRequired,
}
