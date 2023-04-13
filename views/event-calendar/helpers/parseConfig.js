import {
  addMinutes,
  toMiliseconds,
  milisecondsToFormat,
} from "./momentHelpers";

export const parseConfig = (
  elem,
  timezone = 0,
  toUTC = false,
  singleDay = false
) => {
  let arr = [];
  if (singleDay === false) {
    Object.entries(elem).forEach(([key, day]) => {
      arr = [...arr, ...parseSingleDay(key, day, timezone, toUTC)];
    });
  } else {
    arr = [...arr, ...parseSingleDay(singleDay, elem, timezone, toUTC)];
  }
  return arr;
};

export const parseSingleDay = (key, day, timezone, toUTC) => {
  let arr = [];
  if (day.active) {
    day.config.forEach((el) => {
      let from = addMinutes(
        `${key}-${el.fromFormat}`,
        toUTC ? -timezone : timezone,
        "dd-hh:mm"
      );
      const thisDay = Number(from.split("-")[0]);
      let to = addMinutes(
        `${key}-${el.toFormat}`,
        toUTC ? -timezone : timezone,
        "dd-hh:mm"
      );
      const tomls = toMiliseconds(to);
      const toMax = toMiliseconds(`${Number(thisDay) + 1}-00:00`);
      const fromMls = toMiliseconds(to);
      const fromMin = toMiliseconds(`${Number(thisDay)}-00:00`);
      if (fromMls < fromMin) {
        arr.push({
          from: `${Number(thisDay)}-00:00`,
          to,
        });
      } else if (tomls > toMax) {
        arr.push({
          to: `${Number(thisDay) + 1}-00:00`,
          from,
        });
        arr.push({
          to,
          from: `${Number(thisDay) + 1}-00:00`,
        });
      } else {
        arr.push({
          from,
          to,
        });
      }
    });
  }
  return arr;
};

export const parseToFront = (data, daysConfig) => {
  const cloned = { ...daysConfig };
  Object.entries(cloned).forEach((v) => {
    v[1].default = true;
    v[1].config = [{ fromFormat: "9:00", toFormat: "18:00" }];
  });
  data.forEach((el) => {
    if (cloned[Number(el.from.split("-")[0])].default)
      cloned[Number(el.from.split("-")[0])] = {
        default: false,
        active: true,
        day: Number(el.from.split("-")[0]),
        config: [
          { fromFormat: el.from.split("-")[1], toFormat: el.to.split("-")[1] },
        ],
      };
    else {
      if (cloned[Number(el.from.split("-")[0])].config.length) {
        // console.log(cloned[Number(el.from.split('-')[0])].config, [
        //   ...cloned[Number(el.from.split('-')[0])].config,
        //   { fromFormat: el.from.split('-')[1], toFormat: el.to.split('-')[1] },
        // ])
        cloned[Number(el.from.split("-")[0])] = {
          default: false,
          active: true,
          day: Number(el.from.split("-")[0]),
          config: [
            ...cloned[Number(el.from.split("-")[0])].config,
            {
              fromFormat: el.from.split("-")[1],
              toFormat: el.to.split("-")[1],
            },
          ],
        };
      }
    }
  });
  return cloned;
};
