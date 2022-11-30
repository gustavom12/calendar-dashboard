import React from "react";
import moment from "moment";

const CalendarHeader = ({ date, label }) => {
  const mDate = moment(date);
  const day = (days = 0) => (
    <div className="rounded-[50%] h-[40px] w-[40px] p-3 bg-[#dddddd] fs-[14px] my-4 cursor-pointer">
      {mDate.clone().startOf("week").add(days, "day").format("DD")}
    </div>
  );
  return (
    <>
      <div className="flex">
        <div className="ml-auto">
          {" "}
          {mDate.format("dddd")} {mDate.format("DD/MM/YYYY")}
        </div>{" "}
        <span className="prev">{"<"}</span>
        <span className="next ml-3">{">"}</span>
      </div>
      <div className="numbers flex justify-around mt-4">
        {day(-1)}
        {day(0)}
        {day(1)}
        {day(2)}
        {day(3)}
        {day(4)}
        {day(5)}
        {day(6)}
        {day(7)}
        {day(8)}
        {day(9)}
        {day(10)}
      </div>
    </>
  );
};

export default CalendarHeader;
