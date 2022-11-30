import React from "react";
import BigCalendar from "../../components/Calendar/Calendar.component";

const Calendar = () => {
  return (
    <div className="Calendar flex d-flex">
      <div className="w-[70%]">
        <BigCalendar />
      </div>
      <div className="w-[30%]">
        <div className="">
          <h1 className="bg-[#ff0000] h-[200px]">ACA VA UN MINI CALENDARIO</h1>
        </div>
        <div className="">
          <h1 className="bg-[#ddd] h-[600px]">
            ACA VA UNA LISTA DE LOS SIGUIENTES TURNOS
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
