/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import moment from "moment";
import { Button } from "antd";
import { FormattedMessage } from "../../translate/fake_react_intl";
import SelectTimezone from "./selectTimezone";
import {useTranslation} from "../../../../contexts/LocalizeContext"

function Month({
  days,
  intl,
  selectedDay,
  setSelectedDay,
  selectedMonth,
  setSelectedMonth,
  daysConfig,
  setConfigModal,
  timezone,
  setTimezone,
}) {
  const { selectedLocale } = useTranslation();
  return (
    <>
      <div className="topInfo">
        <div className="arrows d-flex">
          <span
            className="arrow flex-center arrow1"
            onClick={() =>
              setSelectedMonth(selectedMonth.clone().subtract(1, "month"))
            }
          >
            <img alt="" src="/assets/arrowleft.svg" />
          </span>
          <span
            className="arrow flex-center arrow2"
            onClick={() =>
              setSelectedMonth(selectedMonth.clone().add(1, "month"))
            }
          >
            <img alt="" src="/assets/arrowright.svg" />
          </span>
        </div>
        <div
          className="fw-bold text-capitalize"
          style={{ fontWeight: 600, fontSize: 22, color: "#000" }}
        >
          {intl
            .formatMessage({ selectedLocale, id: selectedMonth.format("MMMM") })
            ?.slice(0, 3)}{" "}
          {selectedMonth.format("yyyy")}
        </div>
        <div className="right">
          <Button
            style={{ width: 140, height: 36 }}
            className="btn-purple"
            onClick={() => setConfigModal(true)}
          >
            <img className="d-none" src="/assets/editwhite.svg" alt="" />
            <span>
              <FormattedMessage id="Edit" />
            </span>
          </Button>
        </div>
      </div>
      <div className="month">
        <span className="dayTitle text-uppercase flex-center text-main">
          {" "}
          {intl.formatMessage({ selectedLocale, id: "_day0" })}
        </span>
        <span className="dayTitle text-uppercase flex-center text-main">
          {" "}
          {intl.formatMessage({ selectedLocale, id: "_day1" })}
        </span>
        <span className="dayTitle text-uppercase flex-center text-main">
          {" "}
          {intl.formatMessage({ selectedLocale, id: "_day2" })}
        </span>
        <span className="dayTitle text-uppercase flex-center text-main">
          {" "}
          {intl.formatMessage({ selectedLocale, id: "_day3" })}
        </span>
        <span className="dayTitle text-uppercase flex-center text-main">
          {" "}
          {intl.formatMessage({ selectedLocale, id: "_day4" })}
        </span>
        <span className="dayTitle text-uppercase flex-center text-main">
          {" "}
          {intl.formatMessage({ selectedLocale, id: "_day5" })}
        </span>
        <span className="dayTitle text-uppercase flex-center text-main">
          {" "}
          {intl.formatMessage({ selectedLocale, id: "_day6" })}
        </span>
        {days.map((day, i) => (
          <div
            key={i}
            style={{
              transition: "all linear .3s",
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
              if (day.isInCurrentMonth) {
                // && day.date.valueOf() >= moment().subtract(1, "days").valueOf()
                setSelectedDay(day.date.clone());
              }
            }}
          >
            <span className="dayNumber">{day.date.format("DD")}</span>
            <span>
              {" "}
              {daysConfig[day.date.weekday()]?.config?.map(
                (fromTo, i) =>
                  daysConfig[day.date.weekday()].active &&
                  !daysConfig[day.date.weekday()].default && (
                    <div
                      className="fromto"
                      style={{
                        color: "#868EB7",
                        fontWeight: "400",
                        fontSize: 14,
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
        ))}
      </div>
      <SelectTimezone timezone={timezone} setTimezone={setTimezone} />
    </>
  );
}
export default Month;
