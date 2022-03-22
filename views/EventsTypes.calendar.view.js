import React from "react";
import Button from "../base/Button.base";
import { useTranslation } from "../contexts/LocalizeContext";

export default function EventsTypes() {
  const {
    CALENDAR: { EVENTS_TYPES },
  } = useTranslation();
  return (
    <div className="events-type-container">
      <div className="events-type-t">
        <h2>{EVENTS_TYPES.TITLE}</h2>
        <Button>{EVENTS_TYPES.BUTTON}</Button>
      </div>
    </div>
  );
}
