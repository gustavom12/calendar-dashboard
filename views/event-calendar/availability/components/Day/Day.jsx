import React from "react";
import moment from "moment";

const Day = ({
  day,
  daysConfig,
  setSelectedDay,
  setSelectedDayModal,
  singleDayConfigs,
  timezone,
}) => {
  const specialConfig = singleDayConfigs?.find(
    (el) =>
      moment(el.date).format("DD-MM-YYYY") === day.date.format("DD-MM-YYYY")
  );

  return (
    <>
      {" "}
      <div
        style={{
          transition: "all linear .3s",
          cursor: "pointer",
        }}
        className={`
            day text-center flex-center
            ${!day.isInCurrentMonth ? "isNotInMonth" : "inMonth text-main"}
            ${
              day.isInCurrentMonth &&
              day.date.valueOf() >= moment().subtract(1, "days").valueOf() &&
              "available"
            }`}
        onClick={() => {
          setSelectedDay(day.date.clone());
          setSelectedDayModal(
            specialConfig
              ? {
                  ...specialConfig,
                  day: moment(specialConfig.date).weekday(),
                  default: false,
                  active: true,
                  config: specialConfig.config.map((el) => ({
                    fromFormat: moment
                      .duration(el.from.split("-")[1])
                      .add(timezone, "m")
                      .format("HH:mm"),
                    toFormat: moment
                      .duration(el.to.split("-")[1])
                      .add(timezone, "m")
                      .format("HH:mm"),
                  })),
                }
              : true
          );
        }}
      >
        <span
          style={{ color: specialConfig && "#695ee8" }}
          className="dayNumber"
        >
          {day.date.format("DD")}
        </span>
        <span>
          {" "}
          {specialConfig
            ? specialConfig.config.map((el, i) => (
                <div
                  className="fromto"
                  style={{
                    color: "#868EB7",
                    fontWeight: "400",
                    fontSize: 14,
                    color: specialConfig && "#695ee8",
                  }}
                  key={i}
                >
                  <span>
                    {moment
                      .duration(el.from.split("-")[1])
                      .add(timezone, "m")
                      .format("HH:mm")}{" "}
                  </span>
                  <span> - </span>
                  <span>
                    {moment
                      .duration(el.to.split("-")[1])
                      .add(timezone, "m")
                      .format("HH:mm")}
                  </span>
                </div>
              ))
            : daysConfig[day.date.weekday()]?.config?.map(
                (fromTo, i) =>
                  daysConfig[day.date.weekday()].active &&
                  !daysConfig[day.date.weekday()].default && (
                    <div
                      className="fromto"
                      style={{
                        color: "#868EB7",
                        fontWeight: "400",
                        fontSize: 14,
                        color: specialConfig && "#695ee8",
                      }}
                      key={i}
                    >
                      <span>{fromTo.fromFormat} </span>
                      <span> - </span>
                      <span>{fromTo.toFormat}</span>
                    </div>
                  )
              )}{" "}
        </span>
      </div>
    </>
  );
};

export default Day;
