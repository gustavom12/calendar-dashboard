import React from "react";
import FromTo from "./fromTo";

function FromToDay({
  day,
  i,
  setDaysConfig,
  daysConfig,
  setAnyOverlaps,
  isSingleDay = false,
}) {
  const handleChange = (i, i2, key, val) => {
    if (isSingleDay) {
      setDaysConfig((v) => ({
        ...v,
        updated: true,
        config: v.config.map((el, ind) =>
          ind === i2 ? { ...el, [key]: val.format("HH:mm") } : el
        ),
      }));
    } else {
      setDaysConfig((v) => ({
        ...v,
        [i]: {
          ...v[i],
          config: v[i].config.map((el, ind) =>
            ind === i2 ? { ...el, [key]: val.format("HH:mm") } : el
          ),
        },
      }));
    }
  };

  return (
    <>
      {day.config.map((fromTo, i2) => (
        <FromTo
          i2={i2}
          key={i2}
          day={day}
          daysConfig={daysConfig}
          setDaysConfig={setDaysConfig}
          handleChange={handleChange}
          isSingleDay={isSingleDay}
          fromTo={fromTo}
          i={i}
          setAnyOverlaps={setAnyOverlaps}
        />
      ))}
    </>
  );
}
export default FromToDay;
