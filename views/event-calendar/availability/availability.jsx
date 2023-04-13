import React, { useEffect, useMemo, useState } from "react";
import { EventCalendar } from "../../../entities/eventCalendar";
import { buildMonth } from "../helpers/buildMonth";
import { useReFetch } from "../../../pages/api/useFetch";
import Month from "./components/month";
import { parseConfig, parseToFront } from "../helpers/parseConfig";
import { useAuth } from "../../../contexts/AuthContext";
import ConfigModal from "./components/configModal";

function Availability({
  selectedMonth,
  setSelectedMonth,
  intl,
  selectedDay,
  setSelectedDay,
  timezone,
  setTimezone,
  setSelectedDayModal,
  selectedDayModal,
}) {
  const { user } = useAuth();
  const [configModal, setConfigModal] = useState(false);
  const { data: singleDayConfigs } = useReFetch(
    {
      url: `/users/adminConfig/single-day/${user._id}`,
      verificate: () => user._id,
      method: "get",
      reset: true,
    },
    [user, selectedDayModal]
  );
  console.log({ singleDayConfigs });
  const [configId, setConfigId] = useState({ userId: null, configId: null });
  const [daysConfig, setDaysConfig] = useState({
    0: {
      default: true,
      active: false,
      day: 0,
      config: [{ fromFormat: "9:00", toFormat: "18:00" }],
    },
    1: {
      default: true,
      active: false,
      day: 1,
      config: [{ fromFormat: "9:00", toFormat: "18:00" }],
    },
    2: {
      default: true,
      active: false,
      day: 2,
      config: [{ fromFormat: "9:00", toFormat: "18:00" }],
    },
    3: {
      default: true,
      active: false,
      day: 3,
      config: [{ fromFormat: "9:00", toFormat: "18:00" }],
    },
    4: {
      default: true,
      active: false,
      day: 4,
      config: [{ fromFormat: "9:00", toFormat: "18:00" }],
    },
    5: {
      default: true,
      active: false,
      day: 5,
      config: [{ fromFormat: "9:00", toFormat: "18:00" }],
    },
    6: {
      default: true,
      active: false,
      day: 6,
      config: [{ fromFormat: "9:00", toFormat: "18:00" }],
    },
  });
  const resetWithTimezone = (daysconfig) => {
    const arr = parseConfig(daysconfig, timezone);
    if (arr) setDaysConfig(parseToFront(arr, daysConfig));
  };
  const [UTCconfig, setUTCconfig] = useState([]);
  useEffect(() => {
    const eventClass = new EventCalendar();
    setConfigId((v) => ({ ...v, userId: user._id }));
    eventClass
      .getAvailability(user._id)
      .then((response) => {
        const data = response[0];
        setConfigId((v) => ({ ...v, configId: data?._id }));
        if (data?.config) {
          setUTCconfig(data?.config);
          resetWithTimezone(parseToFront(data.config, daysConfig));
        }
      })
      .catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    resetWithTimezone(parseToFront(UTCconfig, daysConfig));
  }, [timezone]);

  const days = useMemo(() => {
    return buildMonth(selectedMonth);
  }, [selectedMonth]);
  return (
    <>
      <Month
        intl={intl}
        days={days}
        daysConfig={daysConfig}
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setConfigModal={setConfigModal}
        timezone={timezone}
        setTimezone={setTimezone}
        setDaysConfig={setDaysConfig}
        selectedDayModal={selectedDayModal}
        setSelectedDayModal={setSelectedDayModal}
        singleDayConfigs={singleDayConfigs}
      />
      <ConfigModal
        daysConfig={daysConfig}
        configModal={configModal}
        setConfigModal={setConfigModal}
        setDaysConfig={setDaysConfig}
        timezone={timezone}
        configId={configId}
        parseConfig={parseConfig}
      />
    </>
  );
}
export default Availability;
