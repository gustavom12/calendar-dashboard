import React from "react";
import Header from "../components/Header.components";
import { useTranslation } from "../contexts/LocalizeContext";
import EventCalendar from "../views/event-calendar/index";

export default function Availability() {
  const { CALENDAR } = useTranslation();
  return (
    <>
      <Header title={CALENDAR.TABS.TYPES} />
      <EventCalendar uniqueTab="typeofevent" />
    </>
  );
}
