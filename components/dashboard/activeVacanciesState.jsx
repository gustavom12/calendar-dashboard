import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "../../contexts/LocalizeContext";
import RadioItem from "./RadioItem";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ActiveVacanciesState = ({ activeVacanciesState }) => {
  const colorList = [
    "#FF4847",
    "#FFCC4D",
    "#39E489",
    "#695EE8",
    "#00A0FF",
    "#DADADA",
  ];
  const { DASHBOARD } = useTranslation();
  const optionsPolar = {
    labels: [],
    series: [],
    options: {
      chart: {
        type: "polarArea",
      },
      tooltip: {
        marker: {
          show: true,
        },
        custom({ series, seriesIndex }) {
          return `<div class="arrow_box"><span>${series[seriesIndex]}%</span></div>`;
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => {
            return value.toFixed(1);
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        colors: colorList,
      },

      fill: {
        colors: colorList,
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],
    },
  };

  const [options, setOptions] = useState(null);

  useEffect(() => {
    setOptions({
      ...optionsPolar,
      series: activeVacanciesState.map((el, i) => el.count),
    });
  }, []);

  return (
    <div className="ActiveVacanciesState mt-0 card_group">
      <h5 className="title"> {DASHBOARD.ACTIVE_VACANCIES_STATE} </h5>
      <div className="graphContainer cardBody">
        <div className="scrollable d-flex">
          {options && (
            <ApexChart
              responsive
              options={options.options}
              series={options.series}
              height={270}
              width="100%"
              type="polarArea"
            />
          )}
          <div className="labels">
            {activeVacanciesState?.map((data, i) => (
              <div className="d-flex label mt-3" key={i}>
                <RadioItem hex={colorList[i]} className="mr-2" />
                <span className="ml-3">{data.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveVacanciesState;
