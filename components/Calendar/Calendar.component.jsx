import React from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import { example } from "./example";
import CalendarHeader from "./CalendarHeader.component";
import "moment/locale/es";
// TODO CUSTOM HEADER

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const Calendar = () => {
  return (
    <div className="Calendar">
      <DragAndDropCalendar
        events={example}
        step={15}
        scrollToTime={moment()}
        localizer={localizer}
        style={{ height: 750 }}
        view="week"
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={(event) => {
          const newStyle = {
            backgroundColor: moment(event.end).isBefore(moment())
              ? `${event.background}99`
              : event.background,
            borderRadius: "3px",
            border: "none",
            outline: "none",
          };
          return {
            className: "",
            style: newStyle,
          };
        }}
        components={{
          toolbar: CalendarHeader,
          // event: (props) => {
          //   console.log({ props });
          //   return <div> event</div>;
        }}
        messages={{
          today: "Hoy",
          next: "Siguiente",
          previous: "Anterior",
          week: "Semana",
          day: "Día",
          month: "Mes",
        }}
        // dayLayoutAlgorithm="no-overlap"
        showMultiDayTimes
        // onEventResize={(event) => updateEvent(event)}
        // onEventDrop={(event) => updateEvent(event)}
      />
    </div>
  );
};

export default Calendar;
