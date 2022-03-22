import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "../../contexts/LocalizeContext";
import RadioItem from "./RadioItem";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const InterviewsActivities = ({ interviewsActivities }) => {
  const colors = {
    purple: "#695EE8",
    lightgrey: "#00A0FF",
  };
  const [stateFiltered, setStateFiltered] = useState(null);
  const { DASHBOARD } = useTranslation();

  useEffect(() => {
    setStateFiltered({
      options: {
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          style: {
            marginTop: "15px",
          },
          categories: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
          ],
        },
        tooltip: {
          show: false,
        },
        // colors: colors,
        plotOptions: {
          bar: {
            stroke: "30px",
          },
        },
        legend: {
          show: false,
        },
        stroke: {
          width: [4, 4, 2.5],
          colors: [colors.purple, colors.lightgrey],
          curve: "smooth",
        },

        fill: {
          colors: [colors.purple, colors.lightgrey],
          opacity: [0, 0],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
            margin: [5, 5, 5],
          },
        },
      },
      series: [
        {
          name: "2022",
          type: "area",
          data: interviewsActivities?.data.map((data) => data || 0),
          color: colors.lightgrey,
          curve: "smooth",
        },
        {
          name: "2021",
          type: "area",
          data: interviewsActivities?.lastYear.map((data) => data || 0),
          color: colors.purple,
          curve: "smooth",
        },
      ],
    });
  }, []);

  return (
    <div className="InterviewsActivities card_group">
      <h5 className="title"> {DASHBOARD.INTERVIEWS_ACTIVITIES} </h5>
      <div className="graphContainer cardBody">
        <div className="radios">
          <div className="d-flex">
            <RadioItem hex={colors.purple} className="mr-2" />
            <div className="year">2021</div>
          </div>
          <div style={{ marginLeft: 90 }} className="d-flex">
            <RadioItem hex={colors.lightgrey} className="mr-2" />
            <div className="year">2022</div>
          </div>
        </div>
        {stateFiltered && (
          <Chart
            options={stateFiltered.options}
            series={stateFiltered.series}
            stroke={stateFiltered.stroke}
            height="220"
            type="line"
          />
        )}
      </div>
    </div>
  );
};

export default InterviewsActivities;
