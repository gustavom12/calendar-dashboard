import React from "react";
import CardGraph from "../../assets/cardGraph"

export default function DashboardCard({ color, value, diff, title }) {
  return (
    <div className="card" style={{ background: color }}>
      <h3>{value}</h3>
      <p> {title} </p>
      <div className="d-flex">
        <div className="percentage">
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: diff > 0 && "rotate(180deg)",
            }}
          >
            <path
              d="M1.5 1.68733L4.21814 4.44666L7.01865 1.68733"
              stroke="white"
              strokeWidth="1.37966"
              strokeLinecap="round"
            />
          </svg>
          <span className="ml-2">{diff}%</span>
        </div>
        {/* <CardGraph /> */}
      </div>
    </div>
  );
}
