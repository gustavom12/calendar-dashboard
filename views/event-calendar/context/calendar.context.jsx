import React, { createContext, useEffect, useState } from "react";
import moment from "moment-timezone";

const anyFunc = () => {};
const initValue = {
  selectedDay: moment(),
  setSelectedDay: anyFunc,
  selectedMonth: moment(),
  setSelectedMonth: anyFunc,
  timezone: 0,
  setTimezone: anyFunc,
};

const CalendarContext = createContext(initValue);
const CalendarProvider = ({ children }) => {
  const defaultUtcOffset = moment().utcOffset();
  const [timezone, setTimezone] = useState(defaultUtcOffset);
  useEffect(() => {
    setSelectedDay((val) => val.clone().utcOffset(timezone));
    setSelectedMonth((val) => val.clone().utcOffset(timezone));
  }, [timezone]);
  const [selectedMonth, setSelectedMonth] = useState(initValue.selectedMonth);
  const [selectedDay, setSelectedDay] = useState(initValue.selectedDay);
  const [selectedDayModal, setSelectedDayModal] = useState(false);
  const data = {
    selectedDay,
    setSelectedDay,
    selectedMonth,
    setSelectedMonth,
    timezone,
    setTimezone,
    selectedDayModal,
    setSelectedDayModal,
  };

  return (
    <CalendarContext.Provider value={data}>{children}</CalendarContext.Provider>
  );
};

export { CalendarProvider };
export default CalendarContext;
