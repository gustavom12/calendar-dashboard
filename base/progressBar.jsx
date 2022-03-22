import React from "react";
import moment from "moment";

const ProgressBar = ({ start, end }) => {
  const diffStartAndEnd = moment(start, "DD/MM/yyyy").diff(
    moment(end, "DD/MM/yyyy"),
    "days"
  );
  const diffNowStart = moment(start, "DD/MM/yyyy").diff(moment(), "days");
  const percentaje = Math.round((diffNowStart / diffStartAndEnd) * 100);
  return (
    <div style={{ alignItems: "center" }} className="ProgressBar d-flex">
      <div
        style={{
          width: 78,
          height: 6,
          borderRadius: 50,
          background: "#E4EDF0",
          overflow: "hidden",
          position: "relative",
          zIndex: 0,
        }}
        className="bar"
      >
        <span
          style={{
            background: percentaje < 100 ? "#39E489" : "#FE3D2E",
            width: `${percentaje}%`,
            position: "absolute",
            zIndex: 1,
            height: 6,
          }}
        />
      </div>
      <span
        style={{
          color: percentaje < 100 ? "#39E489" : "#FE3D2E",
          marginLeft: 10,
          fontWeight: 500,
        }}
      >
        {percentaje}%
      </span>
    </div>
  );
};

export default ProgressBar;
