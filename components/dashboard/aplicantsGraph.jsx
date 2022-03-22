import React, { useEffect, useState } from "react";
import RadioItem from "./RadioItem";
import dynamic from "next/dynamic";
import { useTranslation } from "../../contexts/LocalizeContext";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AplicantsGraph({
  thisYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  lastYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  diff = 0,
}) {
  const colors = {
    green: "#39E489",
    purple: "#695EE8",
    lightgrey: "#00A0FF",
  };
  const { green, purple, lightgrey } = colors;
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
          colors: ["transparent", "transparent", lightgrey],
          curve: "smooth",
        },

        fill: {
          colors: [green, purple, lightgrey],
          opacity: [1, 1, 0.1, 0],
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
          type: "bar",
          data: thisYear.map((data) => data || 0),
          color: purple,
        },
        {
          name: "2021",
          type: "bar",
          data: lastYear.map((data) => data || 0),
          color: green,
        },
        {
          name: "Promedio",
          type: "area",
          data: thisYear.map((data) => data || 0),
          color: lightgrey,
          curve: "smooth",
        },
      ],
    });
  }, [green, lastYear, lightgrey, purple, setStateFiltered, thisYear]);
  return (
    <div className="dashboard_aplicants-chart">
      <h5 className="title"> {DASHBOARD.GRAPH.TITLE} </h5>
      <div className="graphContainer">
        <div className="labels">
          <div className="diff">
            <span className="text-main">
              {diff > 0 ? "+" : "-"}
              {diff}%
            </span>
            <span className="text-secondary">
              {DASHBOARD.GRAPH.DESCRIPTION}
            </span>
          </div>
          <div className="radios">
            <div className="d-flex">
              <RadioItem hex={colors.lightgrey} className="mr-2" />
              <div className="year">{DASHBOARD.GRAPH.AVERAGE}</div>
            </div>
            <div className="d-flex">
              <RadioItem hex={colors.purple} className="mr-2" />
              <div className="year">2021</div>
            </div>
            <div className="d-flex">
              <RadioItem hex={colors.green} className="mr-2" />
              <div className="year">2022</div>
            </div>
          </div>
        </div>
        {stateFiltered && (
          <Chart
            options={stateFiltered.options}
            series={stateFiltered.series}
            stroke={stateFiltered.stroke}
            height="300"
            type="line"
          />
        )}
      </div>
    </div>
  );
}
