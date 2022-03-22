/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react/button-has-type */
import React, { useState, useContext } from "react";
import { FormattedMessage } from "./translate/fake_react_intl";
import ScrollContainer from "react-indiana-drag-scroll";
import useWindowWidth from "./base/useWindowWidth";
import Availability from "./availability/availability";
import CalendarContext from "./context/calendar.context";
import TypeofEvent from "./type-of-event/typeofEvent";
import SavedEvents from "./savedEvents/savedEvents";
import CalendarConnection from "./calendarConnection/calendarConnection";

function EventCalendar({ intl }) {
  const [activeTab, setActiveTab] = useState("events");
  const windowwidth = useWindowWidth();
  const {
    selectedMonth,
    setSelectedMonth,
    setSelectedDay,
    selectedDay,
    timezone,
    setTimezone,
  } = useContext(CalendarContext);
  return (
    <div className="eventCalendar">
      <div className="card">
        {windowwidth > 800 ? (
          <>
            <div className="mainTabs d-flex">
              <div
                className={`mainTab ${activeTab === "events" && "active"}`}
                onClick={() => setActiveTab("events")}
              >
                <FormattedMessage id="Events" />
              </div>
              <div
                className={`mainTab ${activeTab === "typeofevent" && "active"}`}
                onClick={() => setActiveTab("typeofevent")}
              >
                <FormattedMessage id="Type of events" />
              </div>
              <div
                className={`mainTab ${
                  activeTab === "availability" && "active"
                }`}
                onClick={() => setActiveTab("availability")}
              >
                <FormattedMessage id="Availability" />
              </div>
              <div
                className={`mainTab ${
                  activeTab === "calendarconection" && "active"
                }`}
                onClick={() => setActiveTab("calendarconection")}
              >
                <FormattedMessage id="Calendar conection" />
              </div>
            </div>
          </>
        ) : (
          <ScrollContainer>
            <div className="mainTabs d-flex">
              <div
                className={`mainTab ${activeTab === "events" && "active"} tab1`}
                onClick={() => setActiveTab("events")}
              >
                <FormattedMessage id="Events" />
              </div>
              <div
                className={`mainTab ${
                  activeTab === "typeofevent" && "active"
                } tab2`}
                onClick={() => setActiveTab("typeofevent")}
              >
                <FormattedMessage id="Type of events" />
              </div>
              <div
                className={`mainTab ${
                  activeTab === "availability" && "active"
                } tab3`}
                onClick={() => setActiveTab("availability")}
              >
                <FormattedMessage id="Availability" />
              </div>
              <div
                className={`mainTab ${
                  activeTab === "calendarconection" && "active"
                } tab4`}
                onClick={() => setActiveTab("calendarconection")}
              >
                <FormattedMessage id="Calendar conection" />
              </div>
              <div style={{ minWidth: 50 }} />
            </div>
          </ScrollContainer>
        )}
        {activeTab === "availability" && (
          <div style={{ padding: windowwidth > 600 ? "0 35px" : "0 6px" }}>
            <Availability
              selectedMonth={selectedMonth}
              intl={intl}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              setSelectedMonth={setSelectedMonth}
              timezone={timezone}
              setTimezone={setTimezone}
            />
          </div>
        )}
        {activeTab === "typeofevent" && <TypeofEvent />}
        {activeTab === "events" && <SavedEvents timezone={timezone} />}
        {activeTab === "calendarconection" && <CalendarConnection />}
      </div>
    </div>
  );
}
export default EventCalendar;
