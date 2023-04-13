import React, { useState, useEffect } from "react";
import { FormattedMessage } from "../../../translate/fake_react_intl";
import { TimePicker, Button } from "antd";
import moment from "moment";
import { addMinutes, toMiliseconds } from "../../../helpers/momentHelpers";

function FromTo({
  i2,
  handleChange,
  fromTo,
  i,
  day,
  setDaysConfig,
  daysConfig,
  isSingleDay = false,
}) {
  const [overlaps, setOverlaps] = useState(false);
  useEffect(() => {
    const dayConfig = day.config;
    setOverlaps(false);
    for (let index = 0; index < dayConfig.length; index++) {
      if (index !== i2) {
        const el = dayConfig[index];
        if (
          (toMiliseconds(fromTo.fromFormat) >= toMiliseconds(el.fromFormat) &&
            toMiliseconds(fromTo.fromFormat) <= toMiliseconds(el.toFormat)) ||
          (toMiliseconds(fromTo.toFormat) >= toMiliseconds(el.fromFormat) &&
            toMiliseconds(fromTo.toFormat) <= toMiliseconds(el.toFormat))
        )
          setOverlaps(true);
      }
    }
  }, [daysConfig]);
  return (
    <>
      <div className={`fromtoInputs ${overlaps && "overlaps"}`} key={i2}>
        <span className="name">
          {i2 === 0 && <FormattedMessage id={`weekday3letters${i}`} />}
        </span>
        <TimePicker
          defaultValue={moment(`${fromTo.fromFormat}`, "HH:mm")}
          format="HH:mm"
          value={moment(`${fromTo.fromFormat}`, "HH:mm")}
          onChange={(v) => handleChange(i, i2, "fromFormat", v)}
          minuteStep={5}
          dropdownClassName="timepickerfromto"
        />
        -
        <TimePicker
          dropdownClassName="timepickerfromto"
          defaultValue={moment(`${fromTo.toFormat}`, "HH:mm")}
          format="HH:mm"
          value={moment(`${fromTo.toFormat}`, "HH:mm")}
          onChange={(v) => handleChange(i, i2, "toFormat", v)}
          minuteStep={5}
        />
        {(isSingleDay || i2 === 0) && (
          <Button
            onClick={() => {
              if (!isSingleDay) {
                setDaysConfig((val) => {
                  return {
                    ...val,
                    [i]: {
                      ...val[i],
                      config: [
                        ...val[i].config,
                        {
                          fromFormat: addMinutes(`0-${fromTo.toFormat}`, 60),
                          toFormat: addMinutes(`0-${fromTo.toFormat}`, 150),
                        },
                      ],
                    },
                  };
                });
              } else {
                setDaysConfig((val) => {
                  return {
                    ...val,
                    updated: true,
                    config: [
                      ...val.config,
                      {
                        fromFormat: addMinutes(`0-${fromTo.toFormat}`, 60),
                        toFormat: addMinutes(`0-${fromTo.toFormat}`, 150),
                      },
                    ],
                  };
                });
              }
            }}
            style={{ width: 25, border: "none", padding: 0 }}
          >
            <img src="/assets/add.svg" alt="" />{" "}
          </Button>
        )}
        {(i2 !== 0 || isSingleDay) && (
          <Button
            onClick={() => {
              if (!isSingleDay) {
                setDaysConfig((val) => ({
                  ...val,
                  [i]: {
                    ...val[i],
                    config: val[i].config.filter(
                      (el) => el !== val[i].config[i2]
                    ),
                  },
                }));
              } else {
                setDaysConfig((val) => ({
                  updated: true,
                  ...val,
                  config: val.config.filter((el) => el !== val.config[i2]),
                }));
              }
            }}
            style={{ width: 25, border: "none", padding: 0 }}
          >
            <img src="/assets/remove.svg" alt="" />{" "}
          </Button>
        )}
      </div>
      {overlaps && (
        <div
          className="text-danger text-center w-100"
          style={{ marginTop: -3 }}
        >
          <FormattedMessage id="Times overlap with another set of times" />
        </div>
      )}
    </>
  );
}
export default FromTo;
