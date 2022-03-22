import React, { useMemo, useState } from "react";
import Header from "../../components/Header.components";
import { useTranslation } from "../../contexts/LocalizeContext";
import EventCalendar from "../../views/event-calendar/index"

export default function Calendar() {
  const { CALENDAR } = useTranslation();
  return (
    <>
      <Header title={CALENDAR.HEADER} />
      <EventCalendar />
    </>
  )
}