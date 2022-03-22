import React from 'react'
import { intl } from './translate/fake_react_intl'
import { CalendarProvider } from './context/calendar.context'
import EventCalendar from './eventCalendar'

function EventsCalendar() {
  return (
    <CalendarProvider>
      <EventCalendar intl={intl} />
    </CalendarProvider>
  )
}

export default EventsCalendar
