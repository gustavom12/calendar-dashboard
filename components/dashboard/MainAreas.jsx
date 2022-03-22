import React, { useEffect, useState } from "react";
import RadioItem from "./RadioItem";
import dynamic from "next/dynamic";
import { useTranslation } from "../../contexts/LocalizeContext";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PrincipalAreas = ({ mainAreas }) => {
  const { DASHBOARD } = useTranslation();
  const colors = [
    "#39E489",
    "#695EE8",
    "#00A0FF",
    "#FE3D2E",
    "#FFD600",
    "#262D42",
  ];

  const [total, setTotal] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (!mainAreas) return;
    let total = 0;
    mainAreas?.forEach((el) => (total += el.count));
    setTotal(total);
    setOptions({
      series: mainAreas?.map((v) => v.count),
      labels: mainAreas?.map((v) => v.name),
      options: {
        colors,
        chart: {
          type: "donut",
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        tooltip: {
          y: {
            // enabled: false,
            // formatter: function (val) {
            //   console.log({ val });
            //   return "";
            // },
            title: {
              enabled: false,
              formatter: function (seriesName) {
                console.log({ seriesName });
                return null;
              },
            },
          },
        },
        // labels: {
        //   enabled: false,
        // },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    });
  }, [mainAreas]);

  return (
    <div className="PrincipalAreas card_group">
      <h5 className="title"> {DASHBOARD.PRINCIPAL_AREAS} </h5>
      <div className="graphContainer cardBody">
        {mainAreas?.map((vacancie, i) => (
          <div
            key={i}
            className="radio-text"
            style={{
              paddingTop: i === 0 ? 0 : 14,
              borderTop: i === 0 ? "none" : "1px solid #E4EDF0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioItem hex={colors[i]} className="mr-2" />
              <span className="ml-3"> {vacancie.name}</span>
            </div>
            <div style={{ color: "#A1ACC2" }}>
              {" "}
              {Math.round((vacancie.count / total) * 100)}%{" "}
            </div>
          </div>
        ))}
        <div style={{ margin: "40px 0" }}>
          {options && (
            <ApexChart
              options={options.options}
              series={options.series}
              labels={options.labels}
              type="donut"
              width={300}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PrincipalAreas;
